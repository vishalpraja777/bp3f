package com.badukigondu.bp3f.restImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.badukigondu.bp3f.rest.RazorPayRest;
import com.badukigondu.bp3f.service.RazorPayService;
import com.badukigondu.bp3f.wrapper.PaymentResponseWrapper;

@RestController
public class RazorPayRestImpl implements RazorPayRest {

    @Autowired
    RazorPayService razorPayService;

    @Override
    public ResponseEntity<PaymentResponseWrapper> payCampaign(Long campaignId, Map<String, String> requestMap) {
        try {
            return razorPayService.payCampaign(campaignId, requestMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new PaymentResponseWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<PaymentResponseWrapper> redirect(String paymentId, Long campaignId) {
        try {
            return razorPayService.redirect(paymentId, campaignId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new PaymentResponseWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
