package com.backend.subscribeSend;

import com.backend.productImg.ProductImg;
import com.backend.subscribeMember.SubscribeMember;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubscribeSendRepository extends JpaRepository<SubscribeSend, Integer> {

    @Transactional
    @Query(value="update tb_subscribe_send SET sb_send_score = :sbSendScore, " +
            "sb_send_review = :sbSendReview where sb_send_num = :sbSendNum",
            nativeQuery=true)
    void updateReview(SubsReviewDTO subsReviewDTO);

    List<SubscribeSend> findAllBySubscribeMember(SubscribeMember subscribeMember);
}
