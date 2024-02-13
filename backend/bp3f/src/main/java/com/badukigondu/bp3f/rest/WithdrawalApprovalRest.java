package com.badukigondu.bp3f.rest;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.badukigondu.bp3f.wrapper.WithdrawalApprovalWrapper;

@RequestMapping(path = "/withdrawApproval")
public interface WithdrawalApprovalRest {

    @PostMapping("/add")
    ResponseEntity<String> addWithdrawApproval(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping(path = "/getByCampaignId/{campaigId}")
    ResponseEntity<List<WithdrawalApprovalWrapper>> getByCampaignId(@PathVariable(name = "campaigId") Long campaigId);

    @GetMapping(path = "/getAll")
    ResponseEntity<List<WithdrawalApprovalWrapper>> getAll();

}
