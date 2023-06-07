package com.backend.order.service;

import com.backend.cart.repository.CartRepository;
import com.backend.member.entity.Member;
import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import com.backend.order.dto.*;
import com.backend.order.dto.admin.AdminOrderManageDto;
import com.backend.order.dto.admin.AdminOrderUpdateDto;
import com.backend.order.entity.*;
import com.backend.order.repository.OrderRepository;
import com.backend.order.repository.PaymentFinalResRepository;
import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.repository.OrderProductRepository;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;
    private final PaymentFinalResRepository paymentFinalResRepository;
    private final CartRepository cartRepository;
    private final OrderProductRepository orderProductRepository;

    @Override
    public HttpHeaders paymentFinalRes(String paymentKey, String orderId, Integer amount) {
        PaymentFinalRes finalRes = new PaymentFinalRes();
        try {
            verifyRequest(paymentKey, orderId, amount); //토스측 결제금액과 DB데이터 일치하는 지 봄
            PaymentFinalRes result = requestFinalPayment(paymentKey, orderId, amount); //이제 진짜 결제요청 보냄
            finalRes.setOrderName(result.getOrderName());

            //when the payment method is not Card
            if (result.getCard() == null) {
                finalRes.setEasyPay(result.getEasyPay());
                saveRes(result);
            } else { //when the payment method is Card
                finalRes.setCard(result.getCard());
                finalRes.setTotalAmount(result.getTotalAmount());
                saveRes(result);
            }
            Order order = orderRepository.findByOrderId(orderId);

            List<OrderProduct> orderProductList = orderProductRepository.findByOrder(order);
            orderProductList.forEach(product -> product.setOrderState("결제완료"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 결제 완료로 업데이트
        Order order = orderRepository.findByOrderId(orderId);
        updatePaymentState(order);

        // 사용 포인트 차감 + 적립 = 적립포인트 + 보유포인트 - 사용포인트
        pointProcess(order);

        HttpHeaders headers = new HttpHeaders();
        URI location = UriComponentsBuilder.fromUriString("http://localhost:3000/ordercomplete")
                .queryParam("orderId", order.getOrderId())
                .build()
                .toUri();
        headers.setLocation(location);

        return headers;
    }

    // 사용 포인트 차감 + 적립 = 적립포인트 + 보유포인트 - 사용포인트
    private void pointProcess (Order order) {
        Member member = memberRepository.findById(
                order.getMemberId()).orElseThrow(() -> new IllegalArgumentException("일치하는 회원정보 없음"));
        order.getUsePoint();
        int resultPoint = (int) (order.getOrderPriceSum() * 0.01) + member.getMemberPoint() - order.getUsePoint();
        member.setMemberPoint(resultPoint);
        memberRepository.save(member);
    }

    @Override
    public OrderResponse.SuccessOrderDto getOrderCompleteInfo(String orderId) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        PaymentFinalRes finalRes = paymentFinalResFindByOrderId(orderId);

        // 널포인터 익셉션 방지용
        String failureCode = finalRes.getFailure() != null ? finalRes.getFailure().getCode() : "";
        String failureMessage = finalRes.getFailure() != null ? finalRes.getFailure().getMessage() : "";

        String issuerCode = finalRes.getCard() != null ? finalRes.getCard().getIssuerCode() : "";
        String number = (finalRes.getCard() != null ? finalRes.getCard().getNumber() : "");
        Integer installmentPlanMonths = (finalRes.getCard() != null ? finalRes.getCard().getInstallmentPlanMonths() : 0);
        String cardType = finalRes.getCard() != null ? finalRes.getCard().getCardType() : "";
        String ownerType = finalRes.getCard() != null ? finalRes.getCard().getOwnerType() : "";
        String provider = finalRes.getEasyPay() != null ? finalRes.getEasyPay().getProvider() : "";

        Card card = Card.builder()
                .issuerCode(issuerCode)
                .number(number)
                .installmentPlanMonths(installmentPlanMonths)
                .cardType(cardType)
                .ownerType(ownerType)
                .build();

        EasyPay easyPay = EasyPay.builder()
                .provider(provider)
                .build();

        Failure failure = Failure.builder()
                .code(failureCode)
                .message(failureMessage)
                .build();

        Order order = findByOrderIdAndMemberId(orderId, currentMemberId);

        OrderResponse.SuccessOrderDto successOrder;
        if (order.getOrderId() == "0") {
            return OrderResponse.SuccessOrderDto.builder()
                    .orderId("0")
                    .build();
        } else {
            successOrder = OrderResponse.SuccessOrderDto.of(order, failure, card, easyPay);
        }
        System.out.println("============================================================오빠?오빠?차이써?");
        return successOrder;
    }

    @Override
    @Transactional
    public PaymentRes insertOrder(OrderDTO orderDTO) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        // order Id 만드는 과정
        LocalDate currentDate = LocalDate.now();
        String formattedDate = currentDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String orderIdTemp = formattedDate + UUID.randomUUID().toString().substring(0, 6);

        Order order = orderRepository.save(Order.builder()
                .memberId(currentMemberId)
                .orderEmail(orderDTO.getOrderEmail())
                .orderName(orderDTO.getOrderName())
                .orderTel(orderDTO.getOrderTel())
                .shipName(orderDTO.getShipName())
                .shipTel(orderDTO.getShipTel())
                .shipMainAddress(orderDTO.getShipMainAddress())
                .shipSubAddress(orderDTO.getShipSubAddress())
                .shipMessage(orderDTO.getShippingMessage())
                .orderPayment(orderDTO.getOrderPayment())
                .orderPaymentInfo(orderDTO.getOrderPaymentInfo())
                .orderPaymentState(orderDTO.getOrderPaymentState())
                .orderPriceSum(orderDTO.getOrderPriceSum())
                .shipCharge(orderDTO.getShipCharge())
                .orderState(orderDTO.getOrderState())
                .orderId(orderIdTemp)
                .usePoint(orderDTO.getUsePoint())
                .build());

        String prodNames = orderDTO.getProdNames();
        String productNames = countProdNames(prodNames);
        int point = 0;
        if(order.getUsePoint() ==null)
          point=0;
        else
            point = order.getUsePoint();

        PaymentRes res = PaymentRes.builder()
                .payment(orderDTO.getOrderPayment())
                .amount(orderDTO.getOrderPriceSum() - point)
                .orderName(productNames)
                .customerName(order.getOrderName())
                .orderNum(order.getOrderNum())
                .orderId(orderIdTemp)
                .successUrl("http://localhost:8080/successpayment")
                .failUrl("http://localhost:3000/mypage")
                .createDate(OffsetDateTime.now(ZoneOffset.ofHours(9)).toString())
                .paySuccssYn("Y")
                .build();

        return res;
    }

    @Override
    public AddressDTO getRecentAddr() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        System.out.println(currentMemberId);
        Order order = orderRepository.findFirstByMemberIdOrderByOrderNumDesc(currentMemberId);

        return AddressDTO.builder()
                .shipMainAddress(order.getShipMainAddress())
                .shipSubAddress(order.getShipSubAddress())
                .build();
    }

    private String countProdNames(String prodNames) {
        String[] prodNamesArray = prodNames.split(",");
        int count = prodNamesArray.length - 1;
        String firstProduct = prodNamesArray[0].trim();
        String purchaseName;
        if (prodNamesArray.length == 1) {
            purchaseName = firstProduct;
        } else {
            purchaseName = firstProduct + "외 " + count + " 종";
        }

        return purchaseName;
    }

    @Transactional //토스측 결제금액과 DB데이터 일치하는 지 봄
    public void verifyRequest(String tossPaymentKey, String orderId, Integer amount) {

        Order result = orderRepository.findByOrderId(orderId);

        if (result.getOrderPriceSum() - result.getUsePoint() == (amount)) {
            result.setTossPaymentKey(tossPaymentKey);
        } else {
            result.setOrderState("결제 실패");
        }
        orderRepository.save(result);
    }

    @Transactional
    public PaymentFinalRes requestFinalPayment(String tossPaymentKey, String orderId, Integer amount) {
        String testSecretApiKey = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R";
        testSecretApiKey = testSecretApiKey + ":";
        RestTemplate rest = new RestTemplate(); //RestTemplate Http요청 및 응답 헤더용 인스턴스 생성
        HttpHeaders headers = new HttpHeaders(); //Http요청 및 응답 헤더 나타내는 인스턴스 생성
        String encodedAuth = new String(Base64.getEncoder().encode(testSecretApiKey.getBytes(StandardCharsets.UTF_8)));
        //인증 헤더용 인코딩
        headers.setBasicAuth(encodedAuth);
        headers.setContentType(MediaType.APPLICATION_JSON);//헤더 컨텐츠타입 :json
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON)); //response를 json으로 지정

        JSONObject param = new JSONObject(); //json 객체 인스턴스
        param.put("orderId", orderId);
        param.put("amount", amount);
        String tossOriginUrl = "https://api.tosspayments.com/v1/payments/";
        return rest.postForEntity(
                tossOriginUrl + tossPaymentKey,
                new HttpEntity<>(param, headers),
                PaymentFinalRes.class
        ).getBody();
    }

    public void saveRes(PaymentFinalRes result) {
        paymentFinalResRepository.save(result);
    }

    @Override
    public Order orderFindByOrder(String orderId) {
        return orderRepository.findByOrderId(orderId);
    }

    ;

    public Order findByOrderIdAndMemberId(String orderId, String memberID) {
        Order order = orderRepository.findByOrderIdAndMemberId(orderId, memberID);
        if (order == null) {
            Order orderNull = new Order();
            orderNull.setOrderId("0");
            return orderNull;
        }
        return order;
    }

    ;


    public void changeOrderState(Order order, String state) {
        order.setOrderState(state);
        orderRepository.save(order);
    }

    ;

    public void changePaymentState(Order order, boolean state) {
        order.setOrderPaymentState(state);
        orderRepository.save(order);
    }

    public void cancelOrder(Order order, String orderState, boolean paymentState) {
        order.setOrderState(orderState);
        order.setOrderPaymentState(false);
        order.getOrderProducts().forEach(orderProduct -> orderProduct.setOrderState("결제취소"));
        orderRepository.save(order);
    }

    public PaymentFinalRes paymentFinalResFindByOrderId(String orderId) {
        return paymentFinalResRepository.findByOrderId(orderId);
    }

    public void updatePaymentState(Order order) {
        order.updatePaymentState(order);
        orderRepository.save(order);
        List<OrderProduct> orderProductList = order.getOrderProductList(order);
        for (OrderProduct orderProduct : orderProductList) {
            cartRepository.delete(cartRepository.findByMemberIdAndProductOption(orderProduct.getMemberId(), orderProduct.getProductOption()).get());
        }
    }

    @Override
    public List<AdminOrderManageDto> getAdminOrderInfo(String orderState) {
        List<Order> orders = orderState.equals("all") ? orderRepository.findAllByOrderByOrderNumDesc() : orderRepository.findByOrderState(orderState);

        return orders.stream()
                .map(AdminOrderManageDto::of)
                .collect(Collectors.toList());
    }

    @Override
    public void updateOrder(AdminOrderUpdateDto adminOrderUpdateDto) {
        Order order = orderRepository.findByOrderId(adminOrderUpdateDto.getOrderId());
        order.updateOrder(adminOrderUpdateDto.getShipName(), adminOrderUpdateDto.getShipTel(),
                adminOrderUpdateDto.getShipMainAddress(), adminOrderUpdateDto.getShipSubAddress(),
                adminOrderUpdateDto.getShipMessage(), adminOrderUpdateDto.getShipCode(),
                adminOrderUpdateDto.getOrderState());

        orderRepository.save(order);
    }

    @Override
    public List<OrderResponse.OrderListDto> getOrderList() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        return orderRepository.findByMemberId(currentMemberId).stream()
                .map(order -> {
                    List<OrderResponse.OrderProductDto> orderProductList = order.getOrderProducts().stream()
                            .map(OrderResponse.OrderProductDto::of)
                            .collect(Collectors.toList());

                    return OrderResponse.OrderListDto.of(order, orderProductList);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteCancelOrder() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        orderRepository.delete(orderRepository.findByMemberIdAndOrderPaymentStateIsFalse(currentMemberId));
    }

    @Override
    public Optional<List<OrderResponse.MyPageProfileOrderListDto>> getRecentOrdersInMyPageProfile() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();

        Optional<List<Order>> orders = orderRepository.findTop3ByMemberIdOrderByOrderDateDesc(currentMemberId);

        if (orders.isEmpty()) {
            return Optional.empty();
        } else {
            List<OrderResponse.MyPageProfileOrderListDto> orderList = orders.get().stream()
                    .map(order -> OrderResponse.MyPageProfileOrderListDto.of(order, order.getOrderProducts().size()))
                    .collect(Collectors.toList());
            return Optional.of(orderList);
        }
    }
}