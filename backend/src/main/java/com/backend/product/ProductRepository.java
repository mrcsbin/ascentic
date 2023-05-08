package com.backend.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value="select * from tb_product where scent_name IN (select scent_name from tb_scent where scent_note_name = :scentNoteName)",
            nativeQuery=true)
    public List<Product> findAllByScent(@Param("scentNoteName") String scentNoteName);
}
