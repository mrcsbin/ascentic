package com.backend.subscribeMember;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;

@RequestMapping
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
