package com.backend.subscribesend.service;

import com.backend.subscribesend.dto.SubsReviewDTO;
import com.backend.subscribesend.dto.SubsSendDTO;
import com.backend.subscribesend.dto.SubsSendInsertDTO;
import com.backend.subscribesend.dto.admin.AdminSbSendUpdateDto;
import com.backend.subscribesend.dto.admin.AdminSendDto;

import java.util.List;

public interface SubscribeSendService {

    public void insertSubsSend(SubsSendInsertDTO subsSendInsertDTO);
    public void insertSubsReview(SubsReviewDTO subsReviewDTO);

    public List<SubsSendDTO> getSubs();

    List<AdminSendDto> getAdminSbSend(String sbSendState);

    void updateSbSend(AdminSbSendUpdateDto adminSbSendUpdateDto);

}
