package com.backend.taste.repository;

import com.backend.member.entity.Member;
import com.backend.taste.entity.Taste;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TasteRepository extends JpaRepository<Taste, Integer> {
    Taste findDistinctTopByMemberOrderByTasteNumDesc(Member member);
}
