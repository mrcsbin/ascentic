package com.backend.productImg;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProdImgRepository extends JpaRepository<ProductImg,Integer> {

    @Query(value="select * from tb_prod_image where prod_num = :prodNum and prod_image_type = :prodImageType limit 1",
            nativeQuery=true)
    ProductImg findTopByProdNumAndProdImageType(Integer prodNum, Integer prodImageType);
}



