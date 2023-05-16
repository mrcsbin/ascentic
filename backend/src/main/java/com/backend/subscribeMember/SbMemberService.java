package com.backend.subscribeMember;


import org.springframework.stereotype.Service;

@Service
public interface SbMemberService {
    public void sbMemberAdd(SubscribeMemberDto subscribeMemberDto);

    public LastSbMemberDTO getLastSbMemberByMemberId();

}
