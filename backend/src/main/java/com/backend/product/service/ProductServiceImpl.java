package com.backend.product.service;

import com.backend.member.jwt.SecurityUtils;
import com.backend.orderproduct.repository.OrderProductRepository;
import com.backend.product.dto.ProductResponse;
import com.backend.product.dto.admindto.AdminProdUpdateInfoDto;
import com.backend.product.dto.admindto.AdminProductListDto;
import com.backend.product.dto.admindto.OptionDto;
import com.backend.product.entity.Product;
import com.backend.product.repository.ProductRepository;
import com.backend.productimage.repository.ProductImageRepository;
import com.backend.productoption.entity.ProductOption;
import com.backend.productoption.repository.ProductOptionRepository;
import com.backend.review.repository.ReviewRepository;
import com.backend.scent.repository.ScentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final ReviewRepository reviewRepository;
    private final ProductOptionRepository productOptionRepository;
    private final ScentRepository scentRepository;

    public void create(Product product) {
        productRepository.save(product);
    }

    @Override
    public Product ProdDetail(Integer prod_num) {
        Product product = productRepository.findById(prod_num).orElse(null);
        return product;
    }

    @Override
    public ProductResponse.ProductDetailDto getProductDetail(Integer prodNum) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Product findProduct = productRepository.findById(prodNum).orElseThrow(() -> new RuntimeException("상품 없삼"));
        findProduct.setProdReadCount(findProduct.getProdReadCount() + 1);
        productRepository.save(findProduct);

        List<ProductResponse.ReviewDto> reviews = reviewRepository.findByProdNum(prodNum).stream()
                        .map(ProductResponse.ReviewDto::of)
                        .collect(Collectors.toList());

        return ProductResponse.ProductDetailDto.of(findProduct, currentMemberId, reviews);
    }

    @Override
    public List<ProductResponse.ProductListDto> getListByCategory(String scentName) {
        List<Product> products = scentName.equals("all") ? productRepository.findAll() : productRepository.findByScentScentNoteName(scentName);

        return products.stream()
                .filter(product -> !product.getProdState().equals("판매종료"))
                .map(ProductResponse.ProductListDto::of)
                .collect(Collectors.toList());
    }

    @Override
    public List<AdminProductListDto> getAdminProdList(String category) {
        List<Product> products = category.equals("all") ? productRepository.findAll() : productRepository.findByProdCategory(category);

        return products.stream()
                .map(AdminProductListDto::of)
                .collect(Collectors.toList());
    }

    @Override
    public AdminProdUpdateInfoDto getAdminProdUpdateInfo(Integer prodNum) {
        return AdminProdUpdateInfoDto.of(productRepository.findById(prodNum).orElse(null));
    }

    @Override
    public Integer updateAdminProd(AdminProdUpdateInfoDto adminProdUpdateInfoDto) {
        Product product;
        if (adminProdUpdateInfoDto.getProdNum() != null) {
            product = productRepository.findById(adminProdUpdateInfoDto.getProdNum()).orElse(null);
        } else {
            product = new Product();
            product.setProdDate(LocalDateTime.now());
            product.setProdReadCount(0);
            product.setProdWishCount(0);
        }
        product.setScent(scentRepository.findById(adminProdUpdateInfoDto.getScentName()).orElse(null));
        product.setProdName(adminProdUpdateInfoDto.getProdName());
        product.setProdCategory(adminProdUpdateInfoDto.getProdCategory());
        product.setProdState(adminProdUpdateInfoDto.getProdState());
        product.setProdInfo(adminProdUpdateInfoDto.getProdInfo());
        Product resProduct = productRepository.save(product);

        updateOptions(adminProdUpdateInfoDto, product); // 옵션 업데이트

        return resProduct.getProdNum();
    }

    // 옵션 업데이트
    private void updateOptions(AdminProdUpdateInfoDto adminProdUpdateInfoDto, Product product) {
        List<OptionDto> optionDtos = adminProdUpdateInfoDto.getOptions();

        for (OptionDto optionDto : optionDtos) {
            ProductOption option = optionDto.getOptionNum() != null ?
                    productOptionRepository.findById(optionDto.getOptionNum()).orElse(null) :
                    new ProductOption();

            option.setProduct(product);
            option.setProdOption(optionDto.getProdOption());
            option.setProdPrice(optionDto.getProdPrice());
            option.setProdStock(optionDto.getProdStock());
            option.setOptionState(optionDto.getOptionState());
            productOptionRepository.save(option);
        }
    }

    public List<ProductResponse.ProductSearchDto> getSearchList(String searchData) {
        System.out.println("searchData = " + searchData);
        if (searchData.length() < 2) {
            return Collections.emptyList();
        }
        return productRepository.findByProdNameContaining(searchData)
                .stream()
                .map(ProductResponse.ProductSearchDto::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponse.RecommendProductDto> getRecommendList(String category, Integer productNum) {
        int pageNumber = 0; // 첫 번째 페이지
        int pageSize = 6; // 페이지 크기는 6

        System.out.println("category = " + category);
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Product> productPage = productRepository.findByProdCategoryAndProdNumNot(category, productNum, pageable);

        return productPage.getContent()
                .stream()
                .map(ProductResponse.RecommendProductDto::of)
                .collect(Collectors.toList());
    }
}
