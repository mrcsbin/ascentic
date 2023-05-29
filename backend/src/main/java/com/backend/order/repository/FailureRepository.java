package com.backend.order.repository;

import com.backend.order.dto.Failure;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FailureRepository extends JpaRepository<Failure, Integer> {
}
