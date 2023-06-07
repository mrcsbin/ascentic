package com.backend.order.controller;

import com.backend.member.jwt.SecurityUtils;
import com.backend.order.dto.*;
import com.backend.order.entity.*;
import com.backend.order.dto.admin.AdminOrderManageDto;
import com.backend.order.dto.admin.AdminOrderUpdateDto;
import com.backend.order.entity.Card;
import com.backend.order.entity.Failure;
import com.backend.order.entity.Order;
import com.backend.order.entity.PaymentFinalRes;
import com.backend.order.repository.OrderRepository;
import com.backend.order.service.OrderServiceImpl;
import com.backend.orderproduct.entity.OrderProduct;
import com.backend.orderproduct.repository.OrderProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class OrderController {

    private final OrderServiceImpl orderService;

    @PostMapping("/finishorder")// 상품 주문 API
    public PaymentRes insertOrder(@RequestBody OrderDTO orderDTO) {
        return orderService.insertOrder(orderDTO);
    }

    @GetMapping("/recentaddr") // 최근 배송지 가져오기
    public AddressDTO getRecentAddr() {
        return orderService.getRecentAddr();
    }

    @GetMapping("/successpayment") // 최종 결제 승인 요청
    public ResponseEntity<?> paymentFinalRes(@RequestParam String paymentKey,
                                             @RequestParam String orderId, @RequestParam Integer amount) {
        HttpHeaders headers = orderService.paymentFinalRes(paymentKey, orderId, amount);
        return ResponseEntity.status(HttpStatus.MOVED_PERMANENTLY)
                .headers(headers)
                .build();
    }

    @GetMapping("/orderCompleteInfo")
    public OrderResponse.SuccessOrderDto getOrderCompleteInfo(String orderId) {
        return orderService.getOrderCompleteInfo(orderId);

    }

    @GetMapping("/getAdminOrderInfo")
    public List<AdminOrderManageDto> getAdminOrderInfo(@RequestParam("orderState") String orderState) {
        return orderService.getAdminOrderInfo(orderState);
    }

    @PostMapping("/updateOrderInfo")
    public void updateOrder(@RequestBody AdminOrderUpdateDto AdminOrderUpdateDto) {
        orderService.updateOrder(AdminOrderUpdateDto);
    }

    @GetMapping("/order/getlist")
    public List<OrderResponse.OrderListDto> getOrderList() {
        return orderService.getOrderList();
    }

    @GetMapping("/order/delete")
    public void deleteCancelOrder() {
        orderService.deleteCancelOrder();
    }

    @GetMapping("/order/get/mypage-profile")
    public Optional<List<OrderResponse.MyPageProfileOrderListDto>> getRecentOrdersInMyPageProfile() {
        return orderService.getRecentOrdersInMyPageProfile();
    }
}
