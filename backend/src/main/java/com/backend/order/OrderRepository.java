package com.backend.order;

import com.backend.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
//    @Transactional
//    @Query(value = "select member_id, ship_main_address, ship_sub_address from tb_order where member_id = :memberId order by order_id asc limit 1", nativeQuery = true)
//    AddressDTO findRecentAddressByMemberId(@Param("memberId") String memberId);

    Order findTopByMember(Member member);
}
