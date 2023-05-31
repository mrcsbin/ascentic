package com.backend.subscribesend.repository;

import com.backend.subscribemember.entity.SubscribeMember;
import com.backend.subscribeproduct.entity.SubscribeProduct;
import com.backend.subscribesend.entity.SubscribeSend;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubscribeSendRepository extends JpaRepository<SubscribeSend, Integer> {
//    @Transactional
//    @Query(value="update tb_subscribe_send SET sb_send_score = :sb_send_score, " +
//            "sb_send_review = :sb_send_review where sb_send_num = :sb_send_num",
//            nativeQuery=true)
//    void updateReview(@Param("sb_send_num") Integer sb_send_num, @Param("sb_send_score") Integer sb_send_score, @Param("sb_send_review") String sb_send_review);

    List<SubscribeSend> findAllBySubscribeMember(SubscribeMember subscribeMember);

    Double findAverageSbSendScoreBySubscribeProduct(SubscribeProduct subscribeProduct);
}
