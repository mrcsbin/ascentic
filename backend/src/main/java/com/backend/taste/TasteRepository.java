package com.backend.taste;

import com.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TasteRepository extends JpaRepository<Taste, Integer> {
    Taste findDistinctTopByMemberOrderByTasteNumDesc(Member member);
}
