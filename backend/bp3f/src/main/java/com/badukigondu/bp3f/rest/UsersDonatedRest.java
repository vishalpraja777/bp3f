package com.badukigondu.bp3f.rest;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.badukigondu.bp3f.wrapper.UsersDonatedWrapper;

@RequestMapping(path = "/usersDonated")
public interface UsersDonatedRest {
    
    @PostMapping(path = "/add")
    public ResponseEntity<String> addDonation(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping(path = "/getAll")
    public ResponseEntity<List<UsersDonatedWrapper>> getAllDonation();

    @GetMapping(path = "/getByCampaignId/{campaignId}")
    public ResponseEntity<List<UsersDonatedWrapper>> getDonationCampaignId(@PathVariable(name = "campaignId") Long campaignId);

}
