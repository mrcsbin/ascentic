package com.backend.product.service;

import com.backend.product.dto.admindto.AdminProdUpdateInfoDto;
import com.backend.product.dto.admindto.AdminProductListDto;
import com.backend.product.dto.ProductResponse;
import com.backend.product.entity.Product;

import java.util.List;

public interface ProductService {

    Product ProdDetail(Integer prod_num);

    List<ProductResponse.ProductListDto> getListByCategory(String ScentName);

    List<AdminProductListDto> getAdminProdList(String scent);

    AdminProdUpdateInfoDto getAdminProdUpdateInfo(Integer prodNum);

    void updateAdminProd(AdminProdUpdateInfoDto adminProdUpdateInfoDto);
}
