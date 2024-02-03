package com.badukigondu.bp3f.rest;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.badukigondu.bp3f.wrapper.WithdrawalRequestWrapper;

@RequestMapping(path = "/withdraw")
public interface WithdrawalRequestRest {
    
    @PostMapping(path = "/add")
    ResponseEntity<String> addWithdrawalRequest(@RequestBody(required = true) Map<String,String> requestMap);
    
    @GetMapping(path="/getByCampaignId/{campaigId}")
    ResponseEntity<List<WithdrawalRequestWrapper>> getByCampaignId(@PathVariable(name = "campaigId") Long campaigId);

}
