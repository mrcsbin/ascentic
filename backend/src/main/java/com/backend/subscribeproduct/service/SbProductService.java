package com.backend.subscribeproduct.service;

import com.backend.subscribeproduct.dto.SbProductDTO;
import com.backend.subscribeproduct.dto.SbProductReqDTO;

import java.util.List;

public interface SbProductService {
    public void addSbProduct(SbProductReqDTO sbProductReqDTO);
    public List<SbProductDTO> listSbProduct(String scentNoteName);
    public void updateSbProduct(Integer sbProdNum, SbProductReqDTO sbProductReqDTO);
    public void deleteSbProduct(Integer sbProdNum);
}
