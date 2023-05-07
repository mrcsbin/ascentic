package com.backend.order;

import com.backend.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findFirstByMemberOrderByOrderIdDesc(Member member);
}
