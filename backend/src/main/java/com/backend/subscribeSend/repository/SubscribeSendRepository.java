package com.backend.subscribeSend.repository;

import com.backend.subscribeMember.entity.SubscribeMember;
import com.backend.subscribeSend.entity.SubscribeSend;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubscribeSendRepository extends JpaRepository<SubscribeSend, Integer> {

    @Transactional
    @Query(value="update tb_subscribe_send SET sb_send_score = :sb_send_score, " +
            "sb_send_review = :sb_send_review where sb_send_num = :sb_send_num",
            nativeQuery=true)
    void updateReview(Integer sb_send_num, Integer sb_send_score, String sb_send_review);

    List<SubscribeSend> findAllBySubscribeMember(SubscribeMember subscribeMember);
}
