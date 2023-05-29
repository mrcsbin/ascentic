package com.backend.subscribeproduct.controller;

import com.backend.subscribeproduct.dto.SbProductDTO;
import com.backend.subscribeproduct.dto.SbProductReqDTO;
import com.backend.subscribeproduct.service.SbProductServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/subsProduct")
public class SbProductController {

    private final SbProductServiceImpl sbProductService;

    @PostMapping("/add")
    public void createSbProduct(@RequestPart("image") MultipartFile file,
                                @RequestPart("sbProduct") SbProductReqDTO sbProductReqDTO) throws IOException {
        sbProductService.addSbProduct(file, sbProductReqDTO);
    }

    @GetMapping ("/list")
    public List<SbProductDTO> listSbProduct(@RequestParam("scentnote") String scentNoteName){
        return sbProductService.listSbProduct(scentNoteName);
    }

    @PostMapping("/update/{id}")
    public void updateSbProduct(@PathVariable("id") Integer sbProdNum,
                                @RequestPart(value="image", required = false) MultipartFile file,
                                @RequestPart("sbProduct") SbProductReqDTO sbProductReqDTO) throws IOException {
        sbProductService.updateSbProduct(sbProdNum, file, sbProductReqDTO);
    }

    @PostMapping("/delete/{id}")
    public void deleteSbProduct(@PathVariable("id") Integer sbProdNum){
        sbProductService.deleteSbProduct(sbProdNum);
    }
}
