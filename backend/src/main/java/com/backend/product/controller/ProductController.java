package com.backend.product.controller;

import com.backend.product.dto.admindto.AdminProdUpdateInfoDto;
import com.backend.product.dto.admindto.AdminProductListDto;
import com.backend.product.dto.ProductResponse;
import com.backend.product.service.ProductServiceImpl;
import com.backend.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping
@RestController
@RequiredArgsConstructor
public class ProductController {
    private final ProductServiceImpl productServiceImpl;

    @PostMapping("/prodDetail")
    public void create(@RequestBody Product product) {
        productServiceImpl.create(product);
    }

    @GetMapping("/proddetail/{prod_num}")
    public ProductResponse.ProductDetailDto getProductDetail(@PathVariable("prod_num") Integer prodNum) {
        return productServiceImpl.getProductDetail(prodNum);
    }

    @GetMapping("/listscent")
    public List<ProductResponse.ProductListDto> getCategory(@RequestParam("category") String category) {
        return productServiceImpl.getListByCategory(category);
    }

    @GetMapping("/admingetprodlist")
    public List<AdminProductListDto> getAdminProdList(@RequestParam("category") String category) {
        return productServiceImpl.getAdminProdList(category);
    }

    @GetMapping("/admingetProdUpdateInfo")
    public AdminProdUpdateInfoDto getAdminProdUpdateInfo(@RequestParam("prodNum") Integer prodNum) {
        return productServiceImpl.getAdminProdUpdateInfo(prodNum);
    }

    @PostMapping("/adminProdUpdate")
    public Integer updateAdminProd(@RequestBody AdminProdUpdateInfoDto adminProdUpdateInfoDto) {
        return productServiceImpl.updateAdminProd(adminProdUpdateInfoDto);
    }

    @GetMapping("/search")
    public List<ProductResponse.ProductSearchDto> getSearchList(String searchData) {
        return productServiceImpl.getSearchList(searchData);
    }

    @GetMapping("/recommend/{productNum}")
    public List<ProductResponse.RecommendProductDto> getRecommendList(@PathVariable Integer productNum, @RequestParam String category) {
        System.out.println("productNum = " + productNum);
        System.out.println("category = " + category);
        return productServiceImpl.getRecommendList(category, productNum);
    }
}
