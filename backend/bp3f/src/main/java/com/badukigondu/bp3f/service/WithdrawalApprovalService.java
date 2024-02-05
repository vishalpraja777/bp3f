package com.badukigondu.bp3f.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.badukigondu.bp3f.wrapper.WithdrawalApprovalWrapper;

public interface WithdrawalApprovalService {

    ResponseEntity<String> addWithdrawApproval(Map<String, String> requestMap);

    ResponseEntity<List<WithdrawalApprovalWrapper>> getByCampaignId(Long campaigId);
    
}
