package com.backend.product;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping
@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductServiceImpl productServiceImpl;
    private final ProductRepository productRepository;

    @PostMapping("/prodDetail")
    public void create(@RequestBody Product product){
        productServiceImpl.create(product);
    }

    @GetMapping("/prodDetail/{prod_num}")
    public Optional<Product> prodDetail(@PathVariable("prod_num") Long prod_num){
        Optional<Product> product = productServiceImpl.ProdDetail(prod_num);
        return product;
    }

    @GetMapping("/Order/{prod_num}/{prod_ea}")
    public void prodOrder(@PathVariable("prod_num")Long prod_num, @PathVariable("prod_ea") int prod_ea){

    }

    @GetMapping("/prodDetail/list")
    public List<Product> getAll(){
        List<Product> all = productRepository.findAll();
        return all;
    }
}
