package com.backend.scent.service;

import com.backend.scent.dto.ScentDTO;

import java.util.List;

public interface ScentService {
    public List<ScentDTO> scentlist(String scentNote);
}
