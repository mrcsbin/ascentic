package com.backend.member.repository;

import com.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findById(String id);

    Optional<Member> findByNameAndEmail(String name, String email);

    Optional<Member> findByNameAndIdAndEmail(String name, String id, String email);

    Optional<Member> deleteById(String id);
}
