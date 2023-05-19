package com.backend.order.repository;

import com.backend.member.entity.Member;
import com.backend.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findFirstByMemberOrderByOrderIdDesc(Member member);
}
