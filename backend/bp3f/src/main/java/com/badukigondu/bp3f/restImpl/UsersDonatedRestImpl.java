package com.badukigondu.bp3f.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.rest.UsersDonatedRest;
import com.badukigondu.bp3f.service.UsersDonatedService;
import com.badukigondu.bp3f.utils.Bp3fUtils;
import com.badukigondu.bp3f.wrapper.UsersDonatedWrapper;

@RestController
public class UsersDonatedRestImpl implements UsersDonatedRest {

    @Autowired
    UsersDonatedService usersDonatedService;

    @Override
    public ResponseEntity<String> addDonation(Map<String, String> requestMap) {
        try {
            return usersDonatedService.addDonation(requestMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<UsersDonatedWrapper>> getAllDonation() {
        try {
            return usersDonatedService.getAllDonation();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<UsersDonatedWrapper>> getDonationCampaignId(Long campaignId) {
        try {
            return usersDonatedService.getDonationCampaignId(campaignId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
