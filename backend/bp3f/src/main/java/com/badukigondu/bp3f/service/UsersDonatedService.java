package com.badukigondu.bp3f.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.badukigondu.bp3f.wrapper.UsersDonatedWrapper;

public interface UsersDonatedService {

    ResponseEntity<String> addDonation(Map<String, String> requestMap);

    ResponseEntity<List<UsersDonatedWrapper>> getAllDonation();

    ResponseEntity<List<UsersDonatedWrapper>> getDonationCampaignId(Long campaignId);
    
}
