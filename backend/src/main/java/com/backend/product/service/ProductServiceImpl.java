package com.backend.product.service;

import com.backend.product.dto.ProductDetailDto;
import com.backend.product.dto.ProductListDto;
import com.backend.product.repository.ProductRepository;
import com.backend.product.entity.Product;
import com.backend.productimg.entity.ProductImg;
import com.backend.productimg.repository.ProductImgRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductImgRepository productImgRepository;

    public void create(Product product) {
        productRepository.save(product);
    }

    @Override
    public Product ProdDetail(Integer prod_num) {
        Product product = productRepository.findById(prod_num).orElse(null);
        return product;
    }

    public ProductDetailDto getProductDetail(Integer prodNum) {
//        Member member = memberRepository.findById(currentMemberId).get();
//        member.buyWelcomePackageYn();
//        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        String currentMemberId = "sungbin";
        Optional<Product> findProduct = productRepository.findById(prodNum);
        findProduct.get().setProdReadCount(findProduct.get().getProdReadCount() + 1);
        productRepository.save(findProduct.get());

        if (findProduct.isPresent()) {
            Product product = findProduct.get();
            List<Integer> prodPrice = new ArrayList<>(Arrays.asList(product.getProductPrice(0), product.getProductPrice(1)));
            List<String> prodOption = new ArrayList<>(Arrays.asList(product.getProductOption(0), product.getProductOption(1)));
            List<String> prodImages = new ArrayList<>();
            List<ProductImg> productImgList = productImgRepository.findAllByProdImageTypeAndProductProdNum(1, product.getProdNum());

            for (ProductImg productImg : productImgList) {
                prodImages.add(productImg.getProdSaveName());
            }
            return ProductDetailDto.builder()
                    .prodNum(prodNum)
                    .prodName(product.getProdName())
                    .prodCategory(product.getProdCategory())
                    .prodInfo(product.getProdInfo())
                    .prodPrice(prodPrice)
                    .prodOption(prodOption)
                    .prodImage(prodImages)
                    .scent(product.getScent())
                    .isWish(product.isWish(currentMemberId, prodNum))
                    .build();
        } else {
            throw new RuntimeException("상품 없삼");
        }
    }

    @Override
    public List<ProductListDto> getListByCategory(String ScentName) {
        List<ProductListDto> productList = new ArrayList<>();
        if (ScentName.equals("all")) {
            List<Product> products = productRepository.findAll();
            for (Product product : products) {
                ProductImg productImg = productImgRepository.findByProdImageTypeAndProductProdNum(0, product.getProdNum());
                productList.add(ProductListDto.builder()
                        .prodNum(product.getProdNum())
                        .prodName(product.getProdName())
                        .prodInfo(product.getProdInfo())
                        .prodWishCount(product.getProdWishCount())
                        .prodReadCount(product.getProdReadCount())
                        .prodCategory(product.getProdCategory())
                        .prodImage(productImg.getProdSaveName())
                        .prodPrice(product.getProductPrice(0))
                        .build());
            }
        } else {
            List<Product> products = productRepository.findByScentScentNoteName(ScentName);
            for (Product product : products) {
                ProductImg productImg = productImgRepository.findByProdImageTypeAndProductProdNum(0, product.getProdNum());
                productList.add(ProductListDto.builder()
                        .prodNum(product.getProdNum())
                        .prodName(product.getProdName())
                        .prodInfo(product.getProdInfo())
                        .prodWishCount(product.getProdWishCount())
                        .prodReadCount(product.getProdReadCount())
                        .prodCategory(product.getProdCategory())
                        .prodImage(productImg.getProdSaveName())
                        .prodPrice(product.getProductPrice(0))
                        .build());
            }
        }
        return productList;
    }
}
