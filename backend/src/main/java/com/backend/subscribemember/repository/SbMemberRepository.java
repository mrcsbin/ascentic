package com.backend.subscribemember.repository;

import com.backend.subscribemember.entity.SubscribeMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface SbMemberRepository extends JpaRepository<SubscribeMember, Integer> {

    SubscribeMember findTopByMemberId(String memberId);


    @Query(value = "select * from tb_subscribe_member where member_id = :memberId order by sb_start_date desc limit 1", nativeQuery = true)
    SubscribeMember getLastSbMemberByMemberId(String memberId);

    SubscribeMember getFirstByMemberIdOrderBySbStartDateDesc(String memberId);

//    @Query(value = "select sb_member_num from tb_subscribe_member where member_id = :memberId", nativeQuery = true)
//    List<Integer> getSbMemberNum(String memberId);

    Long countBySbEndDateIsNull();

    List<SubscribeMember> findByMemberId(String memberId);
}