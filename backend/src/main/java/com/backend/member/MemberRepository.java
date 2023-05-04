package com.backend.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    boolean existsByMemberId(String memberId);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}
