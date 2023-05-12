package com.backend.subscribeMember;

import com.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SbMemberRepository extends JpaRepository<SubscribeMember, Integer> {

    SubscribeMember findByMember(Member member);
}
