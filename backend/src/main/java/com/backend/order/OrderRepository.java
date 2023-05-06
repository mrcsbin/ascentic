package com.backend.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("select new com.backend.order.AddressDTO(o.member.memberId, o.shipMainAddress, o.shipSubAddress) from Order o where o.member.memberId = :memberId order by o.orderId asc")
    List<AddressDTO> findRecentAddressByMemberId(@Param("memberId") String memberId);
}
