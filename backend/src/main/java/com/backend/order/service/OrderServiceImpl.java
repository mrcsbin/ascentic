package com.backend.order.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.member.repository.MemberRepository;
import com.backend.order.dto.AddressDTO;
import com.backend.order.dto.OrderDTO;
import com.backend.order.dto.OrderResponse;
import com.backend.order.dto.PaymentRes;
import com.backend.order.dto.admin.AdminOrderManageDto;
import com.backend.order.dto.admin.AdminOrderUpdateDto;
import com.backend.order.entity.Order;
import com.backend.order.entity.PaymentFinalRes;
import com.backend.order.repository.OrderRepository;
import com.backend.order.repository.PaymentFinalResRepository;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final MemberRepository memberRepository;
    private final PaymentFinalResRepository paymentFinalResRepository;

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
                .build());

        String prodNames = orderDTO.getProdNames();
        String productNames = countProdNames(prodNames);
        PaymentRes res = PaymentRes.builder()
                .payment(orderDTO.getOrderPayment())
                .amount(orderDTO.getOrderPriceSum())
                .orderName(productNames)
                .customerName(memberRepository.findById(currentMemberId).orElseThrow().getName())
                .orderNum(orderRepository.findByOrderId(orderIdTemp).getOrderNum())
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

    private static String countProdNames(String prodNames) {
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

    @Transactional
    public void verifyRequest(String tossPaymentKey, String orderId, Integer amount) {

        Order result = orderRepository.findByOrderId(orderId);

        if (result.getOrderPriceSum().equals(amount)) {
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

    public PaymentFinalRes paymentFinalResFindByOrderId(String orderId){
     return paymentFinalResRepository.findByOrderId(orderId);
    };

    public void changeOrderState(Order order, String state){
        order.setOrderState(state);
        orderRepository.save(order);
    };

    public void changePaymentState(Order order, boolean state){
        order.setOrderPaymentState(state);
        orderRepository.save(order);
    };

}

    public PaymentFinalRes paymentFinalResFindByOrderId(String orderId) {
        return paymentFinalResRepository.findByOrderId(orderId);
    }

    public void updatePaymentState(Order order) {
        order.updatePaymentState(order);
        orderRepository.save(order);
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
}