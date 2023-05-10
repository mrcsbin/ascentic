package com.backend.subscribeSend;

import java.util.List;

public interface SubscribeSendService {

    public void insertSubsReview(SubsReviewDTO subsReviewDTO);

    public List<SubsSendDTO> getSubs();
}
