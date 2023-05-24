package com.backend.subscribesend.service;

import com.backend.subscribesend.dto.SubsReviewDTO;
import com.backend.subscribesend.dto.SubsSendDTO;
import com.backend.subscribesend.dto.SubsSendInsertDTO;

import java.util.List;

public interface SubscribeSendService {

    public void insertSubsSend(SubsSendInsertDTO subsSendInsertDTO);
    public void insertSubsReview(SubsReviewDTO subsReviewDTO);

    public List<SubsSendDTO> getSubs();
}
