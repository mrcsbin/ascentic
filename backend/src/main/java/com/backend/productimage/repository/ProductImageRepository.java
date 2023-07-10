package com.backend.productimage.repository;

import com.backend.productimage.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {

    @Query(value = "select * from tb_prod_image where prod_num = :prodNum and prod_image_type = :prodImageType limit 1", nativeQuery = true)
    ProductImage findTopByProdNumAndProdImageType(@Param("prodNum") Integer prodNum, @Param("prodImageType") Integer prodImageType);

    //이미지 여러장 받을때 사용
    @Query(value = "select * from tb_prod_image where prod_num = :prodNum and prod_image_type = :prodImageType", nativeQuery = true)
    List<ProductImage> findAllByProdNumAndProdImageType(@Param("prodNum") Integer prodNum, @Param("prodImageType") Integer prodImageType);

    ProductImage findByProdImageTypeAndProductProdNum(Integer prodImageType, Integer prodNum);

    List<ProductImage> findAllByProdImageTypeAndProductProdNum(Integer prodImageType, Integer prodNum);
}



