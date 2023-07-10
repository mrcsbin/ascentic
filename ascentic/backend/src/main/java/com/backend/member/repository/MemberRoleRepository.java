package com.backend.member.repository;

import com.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRoleRepository extends JpaRepository<Member, Long> {
}
