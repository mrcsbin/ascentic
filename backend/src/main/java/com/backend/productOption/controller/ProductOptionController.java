package com.backend.productOption.controller;

import com.backend.productOption.service.ProductOptionServiceImpl;
import com.backend.productOption.entity.ProductOption;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping
@RestController
@RequiredArgsConstructor
public class ProductOptionController {
    private final ProductOptionServiceImpl productOptionService;

    @GetMapping("/prodOption/{prodNum}")
    public List<ProductOption> getProdOptions(@PathVariable("prodNum") Integer prodNum){
        return productOptionService.getProdOption(prodNum);
    }

}
