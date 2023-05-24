package com.backend.order.repository;

import com.backend.member.entity.Member;
import com.backend.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findFirstByMemberIdOrderByOrderNumDesc(String member);
}
