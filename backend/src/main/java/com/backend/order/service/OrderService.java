package com.backend.order.service;

import com.backend.order.dto.*;
import com.backend.order.dto.admin.AdminOrderManageDto;
import com.backend.order.dto.admin.AdminOrderUpdateDto;
import com.backend.order.entity.Order;
import com.backend.order.entity.PaymentFinalRes;

import java.util.List;

public interface OrderService {
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

    List<OrderResponse.MyPageProfileOrderListDto> getRecentOrdersInMyPageProfile();
}
