package com.backend.product.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.product.dto.admindto.AdminProdUpdateInfoDto;
import com.backend.product.dto.admindto.AdminProductListDto;
import com.backend.product.dto.ProductResponse;
import com.backend.product.dto.admindto.OptionDto;
import com.backend.product.repository.ProductRepository;
import com.backend.product.entity.Product;
import com.backend.productoption.entity.ProductOption;
import com.backend.productoption.repository.ProductOptionRepository;
import com.backend.review.entity.Review;
import com.backend.review.repository.ReviewRepository;
import com.backend.productimage.entity.ProductImage;
import com.backend.productimage.repository.ProductImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final ReviewRepository reviewRepository;
    private final ProductOptionRepository productOptionRepository;

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
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        System.out.println("ggg");
        System.out.println(currentMemberId);
        Optional<Product> findProduct = productRepository.findById(prodNum);
        findProduct.get().setProdReadCount(findProduct.get().getProdReadCount() + 1);
        productRepository.save(findProduct.get());

        if (findProduct.isPresent()) {
            Product product = findProduct.get();
            List<Integer> prodPrice = new ArrayList<>(Arrays.asList(product.getProdPrice(0), product.getProdPrice(1)));
            List<String> prodOption = new ArrayList<>(Arrays.asList(product.getProdOption(0), product.getProdOption(1)));
            List<Integer> prodOptionNum = new ArrayList<>(Arrays.asList(product.getProdOptionNum(0), product.getProdOptionNum(1)));
            List<String> prodImages = new ArrayList<>();
            List<ProductImage> productImageList = productImageRepository.findAllByProdImageTypeAndProductProdNum(1, product.getProdNum());
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
            for (ProductImage productImage : productImageList) {
                prodImages.add(productImage.getProdSaveName());
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
                    .prodOptionNum(prodOptionNum)
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
                ProductImage productImage = productImageRepository.findByProdImageTypeAndProductProdNum(0, product.getProdNum());
                productList.add(ProductResponse.ProductListDto.builder()
                        .prodNum(product.getProdNum())
                        .prodName(product.getProdName())
                        .prodInfo(product.getProdInfo())
                        .prodWishCount(product.getProdWishCount())
                        .prodReadCount(product.getProdReadCount())
                        .prodCategory(product.getProdCategory())
                        .prodImage(productImage.getProdSaveName())
                        .prodPrice(product.getProdPrice(0))
                        .build());
            }
        } else {
            List<Product> products = productRepository.findByScentScentNoteName(ScentName);
            for (Product product : products) {
                ProductImage productImage = productImageRepository.findByProdImageTypeAndProductProdNum(0, product.getProdNum());
                productList.add(ProductResponse.ProductListDto.builder()
                        .prodNum(product.getProdNum())
                        .prodName(product.getProdName())
                        .prodInfo(product.getProdInfo())
                        .prodWishCount(product.getProdWishCount())
                        .prodReadCount(product.getProdReadCount())
                        .prodCategory(product.getProdCategory())
                        .prodImage(productImage.getProdSaveName())
                        .prodPrice(product.getProdPrice(0))
                        .build());
            }
        }
        return productList;
    }

    @Override
    public List<AdminProductListDto> getAdminProdList(String category) {
        List<Product> products;

        if (category.equals("all")) {
            products = productRepository.findAll();
        } else {
            products = productRepository.findByProdCategory(category);
        }

        return products.stream()
                .map(product -> {
                    return AdminProductListDto.of(product);
                })
                .collect(Collectors.toList());
    }

    @Override
    public AdminProdUpdateInfoDto getAdminProdUpdateInfo(Integer prodNum) {
        return AdminProdUpdateInfoDto.of(productRepository.findById(prodNum).orElse(null));
    }

    @Override
    public void updateAdminProd(AdminProdUpdateInfoDto adminProdUpdateInfoDto) {
        Product product = productRepository.findById(adminProdUpdateInfoDto.getProdNum()).orElse(null);
        product.setProdName(adminProdUpdateInfoDto.getProdName());
        product.setProdCategory(adminProdUpdateInfoDto.getProdCategory());
        product.setProdInfo(adminProdUpdateInfoDto.getProdInfo());
        productRepository.save(product);

        deleteOptionNum(adminProdUpdateInfoDto, product); // 옵션 삭제
        updateOptions(adminProdUpdateInfoDto, product); // 옵션 업데이트
    }

    // 옵션 삭제
    private void deleteOptionNum(AdminProdUpdateInfoDto adminProdUpdateInfoDto, Product product) {
        List<Integer> optionNum = product.getOptionNums();
        List<Integer> updateOptionNum = adminProdUpdateInfoDto.getOptionNums();

        List<Integer> delOptionNum = optionNum.stream()
                .filter(num -> !updateOptionNum.contains(num))
                .collect(Collectors.toList());

        for (Integer delNum : delOptionNum) {
            productOptionRepository.deleteById(delNum);
        }
    }

    // 옵션 업데이트
    private void updateOptions(AdminProdUpdateInfoDto adminProdUpdateInfoDto, Product product) {
        List<OptionDto> optionDtos = adminProdUpdateInfoDto.getOptions();

        for (OptionDto optionDto : optionDtos) {
            ProductOption option = optionDto.getOptionNum() != null ?
                    productOptionRepository.findById(optionDto.getOptionNum()).orElse(new ProductOption()) :
                    new ProductOption();

            option.setProduct(product);
            option.setProdOption(optionDto.getProdOption());
            option.setProdPrice(optionDto.getProdPrice());
            option.setProdStock(optionDto.getProdStock());
            productOptionRepository.save(option);
        }
    }
}
