package com.badukigondu.bp3f.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.badukigondu.bp3f.pojo.CategoryOptions;

public interface CategoryOptionsService {

    ResponseEntity<String> addCampaignCategory(Map<String, String> requestMap);

    ResponseEntity<List<CategoryOptions>> getAllCampaignCategory();

    ResponseEntity<String> deleteCampaignCategory(Long id);
    
}
