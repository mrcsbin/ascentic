package com.backend.subscribeSend.service;

import com.backend.subscribeSend.dto.SubsReviewDTO;
import com.backend.subscribeSend.dto.SubsSendDTO;
import com.backend.subscribeSend.dto.SubsSendInsertDTO;

import java.util.List;

public interface SubscribeSendService {

    public void insertSubsSend(SubsSendInsertDTO subsSendInsertDTO);
    public void insertSubsReview(SubsReviewDTO subsReviewDTO);

    public List<SubsSendDTO> getSubs();
}
