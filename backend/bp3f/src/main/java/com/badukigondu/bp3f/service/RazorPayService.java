package com.badukigondu.bp3f.service;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.badukigondu.bp3f.wrapper.PaymentResponseWrapper;
import com.razorpay.RazorpayException;

public interface RazorPayService {

    ResponseEntity<PaymentResponseWrapper> payCampaign(Long campaignId, Map<String, String> requestMap);

    ResponseEntity<PaymentResponseWrapper> redirect(String paymentId, Long campaignId) throws RazorpayException;
    
}
