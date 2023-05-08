package com.backend.order;

import com.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findFirstByMemberOrderByOrderIdDesc(Member member);
}
