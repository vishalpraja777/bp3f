package com.badukigondu.bp3f.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.dao.CampaignDao;
import com.badukigondu.bp3f.dao.UsersDonatedDao;
import com.badukigondu.bp3f.pojo.Campaign;
import com.badukigondu.bp3f.pojo.UsersDonated;
import com.badukigondu.bp3f.service.UsersDonatedService;
import com.badukigondu.bp3f.utils.Bp3fUtils;
import com.badukigondu.bp3f.wrapper.UsersDonatedWrapper;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UsersDonatedServiceImpl implements UsersDonatedService {

    @Autowired
    UsersDonatedDao usersDonatedDao;

    @Autowired
    CampaignDao campaignDao;

    @Transactional
    @Override
    public ResponseEntity<String> addDonation(Map<String, String> requestMap) {
        try {
            if (validateDonationMap(requestMap)) {

                UsersDonated usersDonated = usersDonatedDao.save(getUsersDonatedFromMap(requestMap));
                
                Long campaignId = Long.parseLong(requestMap.get("campaignId"));

                Long amountToUpdate = Long.parseLong(requestMap.get("amount")) + campaignDao.getCampaignById(campaignId).getAmountRecieved();

                if(amountToUpdate >= campaignDao.getCampaignById(campaignId).getGoalAmount()){
                    campaignDao.updateStatus(Bp3fConstants.GOAL_REACHED, campaignId);
                }
                campaignDao.updateAmountRecieved(amountToUpdate, campaignId);

                
                // return Bp3fUtils.getResponseEntity("Donation Added Successfully.", HttpStatus.OK);
                return new ResponseEntity<>("{\"message\":\" Donation Added Successfully. \", \"donationId\":\"" + usersDonated.getId()+ "\"}", HttpStatus.OK);
            } else {
                return Bp3fUtils.getResponseEntity(Bp3fConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateDonationMap(Map<String, String> requestMap) {
        if (requestMap.containsKey("amount") && requestMap.containsKey("campaignId")) {
            return true;
        }
        return false;
    }

    private UsersDonated getUsersDonatedFromMap(Map<String, String> requestMap) {
        UsersDonated usersDonated = new UsersDonated();

        usersDonated.setName(requestMap.get("name"));
        usersDonated.setEmail(requestMap.get("email"));
        usersDonated.setMobileNumber(requestMap.get("mobileNumber"));
        usersDonated.setPaymentStatus(requestMap.get("paymentStatus"));
        usersDonated.setAmount(Long.parseLong(requestMap.get("amount")));
        usersDonated.setIsAnonymous(Boolean.parseBoolean(requestMap.get("isAnonymous")));

        Campaign campaign = new Campaign();

        campaign.setId(Long.parseLong(requestMap.get("campaignId")));

        usersDonated.setCampaign(campaign);

        return usersDonated;

    }

    @Override
    public ResponseEntity<List<UsersDonatedWrapper>> getAllDonation() {
        try {
            return new ResponseEntity<>(usersDonatedDao.findAllDonations(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<UsersDonatedWrapper>> getDonationCampaignId(Long campaignId) {
        try {
            return new ResponseEntity<>(usersDonatedDao.getDonationCampaignId(campaignId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
