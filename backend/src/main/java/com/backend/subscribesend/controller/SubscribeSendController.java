package com.backend.subscribesend.controller;

import com.backend.subscribesend.dto.SubsReviewDTO;
import com.backend.subscribesend.dto.SubsSendDTO;
import com.backend.subscribesend.dto.SubsSendInsertDTO;
import com.backend.subscribesend.dto.admin.AdminSbSendUpdateDto;
import com.backend.subscribesend.dto.admin.AdminSendDto;
import com.backend.subscribesend.service.SubscribeSendServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/adminGetSbSend")
    public List<AdminSendDto> getAdminSbSend(@RequestParam("sbSendState") String sbSendState) {
        return subscribeSendServiceImpl.getAdminSbSend(sbSendState);
    }

    @PostMapping("/adminUpdateSbSend")
    public void updateSbSend(@RequestBody AdminSbSendUpdateDto adminSbSendUpdateDto) {
        System.out.println("asd");
        System.out.println(adminSbSendUpdateDto.getSbSendPostcode());
        subscribeSendServiceImpl.updateSbSend(adminSbSendUpdateDto);
    }
}
