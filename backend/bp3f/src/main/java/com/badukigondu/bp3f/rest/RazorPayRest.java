package com.badukigondu.bp3f.rest;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.badukigondu.bp3f.wrapper.PaymentResponseWrapper;

@RequestMapping(path = "/payment")
public interface RazorPayRest {
    
    @PostMapping(path = "/payCampaign/{campaignId}")
    public ResponseEntity<PaymentResponseWrapper> payCampaign(@PathVariable(name = "campaignId") Long campaignId, @RequestBody Map<String, String> requestMap);
    
    public ResponseEntity<PaymentResponseWrapper> redirect(@RequestParam(name = "paymentId") String paymentId, @RequestParam(name = "campaignId") Long campaignId);


}
