package com.backend.productimg;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProdImgRepository extends JpaRepository<com.backend.productimg.entity.ProductImg,Integer> {

    @Query(value="select * from tb_prod_image where prod_num = :prodNum and prod_image_type = :prodImageType limit 1",
            nativeQuery=true)
    com.backend.productimg.entity.ProductImg findTopByProdNumAndProdImageType(@Param("prodNum") Integer prodNum, @Param("prodImageType") Integer prodImageType);

    //이미지 여러장 받을때 사용
    @Query(value="select * from tb_prod_image where prod_num = :prodNum and prod_image_type = :prodImageType",
            nativeQuery=true)


   List<com.backend.productimg.entity.ProductImg> findAllByProdNumAndProdImageType(@Param("prodNum") Integer prodNum, @Param("prodImageType") Integer prodImageType);

}

