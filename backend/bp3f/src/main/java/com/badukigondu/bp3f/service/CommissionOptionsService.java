package com.badukigondu.bp3f.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.badukigondu.bp3f.pojo.CommissionOptions;

public interface CommissionOptionsService {

    ResponseEntity<String> addCommission(Map<String, String> requestMap);

    ResponseEntity<List<CommissionOptions>> getAllCommission();

    ResponseEntity<String> deleteCommission(Long id);
    
}
