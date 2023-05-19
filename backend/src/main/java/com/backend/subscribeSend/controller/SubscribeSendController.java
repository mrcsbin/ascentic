package com.backend.subscribeSend.controller;

import com.backend.subscribeSend.dto.SubsReviewDTO;
import com.backend.subscribeSend.dto.SubsSendDTO;
import com.backend.subscribeSend.dto.SubsSendInsertDTO;
import com.backend.subscribeSend.service.SubscribeSendServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class SubscribeSendController {

    private final SubscribeSendServiceImpl subscribeSendServiceImpl;

    @PostMapping("/insertSubsSend")
    public void insertSubsSend(@RequestBody SubsSendInsertDTO subsSendInsertDTO){
        subscribeSendServiceImpl.insertSubsSend(subsSendInsertDTO);
    }

    @PostMapping("/subscribeReview")
    public void insertSubsReview(@RequestBody SubsReviewDTO subsReviewDTO) {
        subscribeSendServiceImpl.insertSubsReview(subsReviewDTO);
    }

    @GetMapping("/getSubscribe")
    public List<SubsSendDTO> getSubs(){
        return subscribeSendServiceImpl.getSubs();
    }

    //결제일, 배송시작일, 배송완료일 업데이트를 위한 각각의 API필요 (관리자페이지용)
}
