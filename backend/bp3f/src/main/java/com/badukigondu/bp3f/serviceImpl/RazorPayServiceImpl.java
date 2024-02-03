package com.badukigondu.bp3f.serviceImpl;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.badukigondu.bp3f.dao.CampaignDao;
import com.badukigondu.bp3f.service.RazorPayService;
import com.badukigondu.bp3f.service.UsersDonatedService;
import com.badukigondu.bp3f.wrapper.CampaignWrapper;
import com.badukigondu.bp3f.wrapper.PaymentResponseWrapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.razorpay.Order;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RazorPayServiceImpl implements RazorPayService {

    private RazorpayClient razorpayClient;

    @Value("${razorpay.api.key}")
    private String SECRET_ID;// = "rzp_test_V9sMEIt9j0ePh8";

    @Value("${razorpay.api.secret}")
    private String SECRET_KEY;// = "Js08UJ0kHkZukuKMlReE8o56";

    @Autowired
    CampaignDao campaignDao;

    @Autowired
    UsersDonatedService usersDonatedService;

    @Override
    public ResponseEntity<PaymentResponseWrapper> payCampaign(Long campaignId, Map<String, String> requestMap) {

        PaymentResponseWrapper paymentResponseWrapper = new PaymentResponseWrapper();

        try {
            log.info("Secret ID {}", SECRET_ID);
            log.info("Secret Key {}", SECRET_KEY);

            CampaignWrapper campaign = campaignDao.getCampaignById(campaignId);

            razorpayClient = new RazorpayClient(SECRET_ID, SECRET_KEY);

            Long totalAmount = Long.parseLong(requestMap.get("totalAmount"));

            JSONObject paymentLinkRequest = createRazorPayOrder(totalAmount, requestMap);

            PaymentLink paymentLink = razorpayClient.paymentLink.create(paymentLinkRequest);

            String paymentLinkId = paymentLink.get("id");
            String paymentLinkUrl = paymentLink.get("short_url");
            String paymentStatus = paymentLink.get("status");

            requestMap.put("paymentStatus", paymentStatus);

            ResponseEntity<String> donationResponse = usersDonatedService.addDonation(requestMap);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(donationResponse.getBody());
            String donationId = jsonNode.get("donationId").asText();

            log.info("campaign {}\n", campaign);
            log.info("paymentLink {}", paymentLink);

            paymentResponseWrapper.setPayment_link_id(paymentLinkId);
            paymentResponseWrapper.setPayment_link_url(paymentLinkUrl);
            paymentResponseWrapper.setPayment_status(paymentStatus);

            paymentResponseWrapper.setAmount(totalAmount);
            paymentResponseWrapper.setCampaignId(requestMap.get("campaignId"));
            paymentResponseWrapper.setDonationId(donationId);


            // String orderId = (String) order.get("id");
            // System.out.println("Order ID: " + orderId);
            // responseWrapper.setRazorpayOrderId(orderId);
            // responseWrapper.setApplicationFee("" + amount);

            // responseWrapper.setSecretKey(SECRET_KEY);
            // responseWrapper.setSecretId(SECRET_ID);
            // responseWrapper.setPgName("razor");


            return new ResponseEntity<>(paymentResponseWrapper, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new PaymentResponseWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private JSONObject createRazorPayOrder(Long totalAmount, Map<String, String> requestMap) throws RazorpayException {

        JSONObject paymentLinkRequest = new JSONObject();
        paymentLinkRequest.put("amount", totalAmount * 100);
        paymentLinkRequest.put("currency", "INR");

        JSONObject customer = new JSONObject();
        customer.put("name", requestMap.get("name"));
        customer.put("email", requestMap.get("email"));

        paymentLinkRequest.put("customer", customer);

        JSONObject notify = new JSONObject();
        notify.put("sms", true);
        notify.put("email", true);

        paymentLinkRequest.put("notify", notify);

        // paymentLinkRequest.put("callback_url", "http://localhost:3000");
        // paymentLinkRequest.put("callback_method", "get");
        // paymentLinkRequest.put("receipt", "txn_123456");
        // paymentLinkRequest.put("payment_capture", 1);
        // return razorpayClient.orders.create(paymentLinkRequest);
        return paymentLinkRequest;
    }

    @Override
    public ResponseEntity<PaymentResponseWrapper> redirect(String paymentId, Long campaignId) throws RazorpayException {

        CampaignWrapper campaign = campaignDao.getCampaignById(campaignId);

        RazorpayClient razorpayClient = new RazorpayClient(SECRET_ID, SECRET_KEY);

        try {

            Payment payment = razorpayClient.payments.fetch(paymentId);

            if (payment.get("status").equals("captured")) {
                // Set Donated Table
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(new PaymentResponseWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);

    }

}
