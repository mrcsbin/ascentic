package com.backend.subscribemember.controller;

import com.backend.subscribemember.dto.LastSbMemberDTO;
import com.backend.subscribemember.dto.SubscribeMemberDto;
import com.backend.subscribemember.service.SbMemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class SbMemberController {
    private final SbMemberServiceImpl sbMemberService;

    @PostMapping("/startSubscribe")
    public void startSubscribe(@RequestBody SubscribeMemberDto subscribeMemberDto){
        sbMemberService.sbMemberAdd(subscribeMemberDto);
    }

    @GetMapping("/lastSbMember")
    public LastSbMemberDTO lastSubscribeMember(){
        return sbMemberService.getLastSbMemberByMemberId();
    }

    @GetMapping("/endSubscribe")
    public void endSubscribe() {
        sbMemberService.endSubscription();
    }

}
