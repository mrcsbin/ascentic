package com.backend.product.service;

import com.backend.product.dto.ProductResponse;
import com.backend.product.repository.ProductRepository;
import com.backend.product.entity.Product;
import com.backend.productimg.entity.ProductImg;
import com.backend.productimg.repository.ProductImgRepository;
import com.backend.review.entity.Review;
import com.backend.review.repository.ReviewRepository;
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
    private final ReviewRepository reviewRepository;

    public void create(Product product) {
        productRepository.save(product);
    }

    @Override
    public Product ProdDetail(Integer prod_num) {
        Product product = productRepository.findById(prod_num).orElse(null);
        return product;
    }

    public ProductResponse.ProductDetailDto getProductDetail(Integer prodNum) {
//        Member member = memberRepository.findById(currentMemberId).get();
//        member.buyWelcomePackageYn();
//        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        String currentMemberId = "sungbin";
        Optional<Product> findProduct = productRepository.findById(prodNum);
        findProduct.get().setProdReadCount(findProduct.get().getProdReadCount() + 1);
        productRepository.save(findProduct.get());

        if (findProduct.isPresent()) {
            Product product = findProduct.get();
            List<Integer> prodPrice = new ArrayList<>(Arrays.asList(product.getProdPrice(0), product.getProdPrice(1)));
            List<String> prodOption = new ArrayList<>(Arrays.asList(product.getProdOption(0), product.getProdOption(1)));
            List<String> prodImages = new ArrayList<>();
            List<ProductImg> productImgList = productImgRepository.findAllByProdImageTypeAndProductProdNum(1, product.getProdNum());
            List<Review> reviewList = reviewRepository.findByMemberId(currentMemberId);
            List<ProductResponse.Review> reviews = new ArrayList<>();
            for (Review review : reviewList) {
                reviews.add(ProductResponse.Review.builder()
                        .memberId(review.getMemberId())
                        .reviewContent(review.getReviewContent())
                        .reviewDate(review.getReviewDate())
                        .reviewScore(review.getReviewScore())
                        .reviewCommentList(review.getComments())
                        .build());
            }
            for (ProductImg productImg : productImgList) {
                prodImages.add(productImg.getProdSaveName());
            }
            return ProductResponse.ProductDetailDto.builder()
                    .prodNum(prodNum)
                    .prodName(product.getProdName())
                    .prodCategory(product.getProdCategory())
                    .prodInfo(product.getProdInfo())
                    .prodPrice(prodPrice)
                    .prodOption(prodOption)
                    .prodImage(prodImages)
                    .scent(product.getScent())
                    .isWish(product.isWish(currentMemberId, prodNum))
                    .reviewList(reviews)
                    .prodOptionNum(product.getProdOptionNum())
                    .build();
        } else {
            throw new RuntimeException("상품 없삼");
        }
    }

    @Override
    public List<ProductResponse.ProductListDto> getListByCategory(String ScentName) {
        List<ProductResponse.ProductListDto> productList = new ArrayList<>();
        if (ScentName.equals("all")) {
            List<Product> products = productRepository.findAll();
            for (Product product : products) {
                ProductImg productImg = productImgRepository.findByProdImageTypeAndProductProdNum(0, product.getProdNum());
                productList.add(ProductResponse.ProductListDto.builder()
                        .prodNum(product.getProdNum())
                        .prodName(product.getProdName())
                        .prodInfo(product.getProdInfo())
                        .prodWishCount(product.getProdWishCount())
                        .prodReadCount(product.getProdReadCount())
                        .prodCategory(product.getProdCategory())
                        .prodImage(productImg.getProdSaveName())
                        .prodPrice(product.getProdPrice(0))
                        .build());
            }
        } else {
            List<Product> products = productRepository.findByScentScentNoteName(ScentName);
            for (Product product : products) {
                ProductImg productImg = productImgRepository.findByProdImageTypeAndProductProdNum(0, product.getProdNum());
                productList.add(ProductResponse.ProductListDto.builder()
                        .prodNum(product.getProdNum())
                        .prodName(product.getProdName())
                        .prodInfo(product.getProdInfo())
                        .prodWishCount(product.getProdWishCount())
                        .prodReadCount(product.getProdReadCount())
                        .prodCategory(product.getProdCategory())
                        .prodImage(productImg.getProdSaveName())
                        .prodPrice(product.getProdPrice(0))
                        .build());
            }
        }
        return productList;
    }
}
