package com.backend.order.service;

import com.backend.order.dto.AddressDTO;
import com.backend.order.dto.OrderDTO;
import com.backend.order.dto.OrderResponse;
import com.backend.order.dto.PaymentRes;
import com.backend.order.dto.admin.AdminOrderManageDto;
import com.backend.order.dto.admin.AdminOrderUpdateDto;
import com.backend.order.entity.Order;
import com.backend.order.entity.PaymentFinalRes;
import org.springframework.http.HttpHeaders;

import java.util.List;
import java.util.Optional;

public interface OrderService {


    OrderResponse.SuccessOrderDto getOrderCompleteInfo(String orderId);

    HttpHeaders paymentFinalRes(String paymentKey, String orderId, Integer amount);

    PaymentRes insertOrder(OrderDTO orderDTO);

    AddressDTO getRecentAddr();

//    SuccessOrderDto getSuccessOrderInfo(Integer orderNum);

    void verifyRequest(String paymentKey, String orderId, Integer amount);

    PaymentFinalRes requestFinalPayment(String tossPaymentKey, String orderId, Integer amount);

    void saveRes(PaymentFinalRes result);

    public Order orderFindByOrder(String orderId);

    PaymentFinalRes paymentFinalResFindByOrderId(String orderId);

    List<AdminOrderManageDto> getAdminOrderInfo(String orderState);

    void updateOrder(AdminOrderUpdateDto adminOrderUpdateDto);

    List<OrderResponse.OrderListDto> getOrderList();

    Optional<List<OrderResponse.MyPageProfileOrderListDto>> getRecentOrdersInMyPageProfile();
}
