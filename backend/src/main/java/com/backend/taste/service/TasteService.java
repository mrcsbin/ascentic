package com.backend.taste.service;

import com.backend.taste.dto.TasteDTO;
import com.backend.taste.dto.TasteResultDTO;

public interface TasteService {
    TasteResultDTO tasteResProgress(TasteDTO tasteDTO);
    TasteResultDTO getTestResult();
}
