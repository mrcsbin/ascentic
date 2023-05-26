package com.backend.adminanalysis.service;

import java.util.List;
import java.util.Map;

public interface AdminAnalysisService {
    List<Map<String, Object>> getSalesAmountByDateTypeAndProductType(String type, String dateType);

    List<Map<String, Integer>> getAmountSales(String dateType);
}
