package com.backend.subscribeproduct.service;

import com.backend.subscribeproduct.dto.SbProductDTO;
import com.backend.subscribeproduct.dto.SbProductReqDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface SbProductService {
    public void addSbProduct(MultipartFile file, SbProductReqDTO sbProductReqDTO) throws IOException;
    public List<SbProductDTO> listSbProduct(String scentNoteName);
    public void updateSbProduct(Integer sbProdNum, MultipartFile file, SbProductReqDTO sbProductReqDTO) throws IOException;
    public void deleteSbProduct(Integer sbProdNum);
}
