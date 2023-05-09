package com.backend.scent;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScentRepository extends JpaRepository<Scent, String> {
    List<Scent> findScentByScentNoteName(String scentNoteName);
}
