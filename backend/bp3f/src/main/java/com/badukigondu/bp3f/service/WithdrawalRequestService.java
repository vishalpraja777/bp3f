package com.badukigondu.bp3f.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.badukigondu.bp3f.wrapper.WithdrawalRequestWrapper;

public interface WithdrawalRequestService {

    ResponseEntity<String> addWithdrawalRequest(Map<String, String> requestMap);

    ResponseEntity<List<WithdrawalRequestWrapper>> getByCampaignId(Long campaigId);

    ResponseEntity<List<WithdrawalRequestWrapper>> getAll();
    
}
