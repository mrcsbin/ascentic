package com.backend.subscribeMember;

import lombok.RequiredArgsConstructor;
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
}
