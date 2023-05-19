package com.backend.subscribeProduct.controller;

import com.backend.subscribeProduct.dto.SbProductDTO;
import com.backend.subscribeProduct.service.SbProductServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping
@RestController
@RequiredArgsConstructor
public class SbProductController {

    private final SbProductServiceImpl sbProductService;

    @PostMapping("subsProduct")
    public void createSbProduct(@RequestBody SbProductDTO sbProductDTO){
        sbProductService.addSbProduct(sbProductDTO);
    }

}
