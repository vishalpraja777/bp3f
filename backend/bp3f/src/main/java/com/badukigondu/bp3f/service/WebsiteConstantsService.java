package com.badukigondu.bp3f.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.badukigondu.bp3f.pojo.WebsiteConstants;

public interface WebsiteConstantsService {

    ResponseEntity<String> addWebsiteConstants(Map<String, String> requestMap);

    ResponseEntity<WebsiteConstants> getWebsiteConstantsByKey(String keyColumn);

    ResponseEntity<String> updateWebsiteConstants(Long id, Map<String, String> requestMap);
    
}
