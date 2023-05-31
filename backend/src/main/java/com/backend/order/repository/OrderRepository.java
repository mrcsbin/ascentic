package com.backend.order.repository;

import com.backend.order.entity.Order;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findFirstByMemberIdOrderByOrderNumDesc(String memberId);

    Order findByOrderId(String orderId);

    Order findByOrderIdAndMemberId(String orderId
            , String memberId);
}
