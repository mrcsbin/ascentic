package com.backend.prodreview.controller;

import com.backend.prodreview.service.ProdReviewService;
import com.backend.prodreview.service.ProdReviewServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping
@RestController
@RequiredArgsConstructor
public class ProdReviewController {

    private final ProdReviewServiceImpl prodReviewService;

}
