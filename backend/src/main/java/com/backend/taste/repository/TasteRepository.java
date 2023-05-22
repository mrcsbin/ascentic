package com.backend.taste.repository;

import com.backend.member.entity.Member;
import com.backend.taste.entity.Taste;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TasteRepository extends JpaRepository<Taste, Integer> {
    Optional<Taste> findByMemberId(String memberId);
}
