package com.backend.taste.repository;

import com.backend.member.entity.Member;
import com.backend.taste.entity.Taste;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TasteRepository extends JpaRepository<Taste, Integer> {
    @Query("SELECT t FROM Taste t WHERE t.memberId = :memberId ORDER BY t.tasteNum DESC limit 1")
    Optional<Taste> findLastByMemberId(@Param("memberId") String memberId);
}
