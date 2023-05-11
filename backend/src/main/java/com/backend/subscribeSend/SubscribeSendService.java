package com.backend.subscribeSend;

import java.util.List;

public interface SubscribeSendService {

    public void insertSubsSend(SubsSendInsertDTO subsSendInsertDTO);
    public void insertSubsReview(SubsReviewDTO subsReviewDTO);

    public List<SubsSendDTO> getSubs();
}
