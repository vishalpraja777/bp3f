package com.badukigondu.bp3f.serviceImpl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.dao.CampaignDao;
import com.badukigondu.bp3f.dao.UserDao;
import com.badukigondu.bp3f.dao.WithdrawalRequestDao;
import com.badukigondu.bp3f.jwt.JwtUtil;
import com.badukigondu.bp3f.pojo.Campaign;
import com.badukigondu.bp3f.pojo.User;
import com.badukigondu.bp3f.pojo.WithdrawalRequest;
import com.badukigondu.bp3f.service.WithdrawalRequestService;
import com.badukigondu.bp3f.utils.Bp3fUtils;
import com.badukigondu.bp3f.wrapper.WithdrawalRequestWrapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class WithdrawalRequestServiceImpl implements WithdrawalRequestService {

    @Autowired
    WithdrawalRequestDao withdrawalRequestDao;

    @Autowired
    CampaignDao campaignDao;

    @Autowired
    UserDao userDao;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    public ResponseEntity<String> addWithdrawalRequest(Map<String, String> requestMap) {
        try {
            if (validateaddWithdrawalRequestMap(requestMap)) {

                // Logic for requesting the withdrawal

                Campaign campaign = campaignDao.findById(Long.parseLong(requestMap.get("campaignId"))).get();

                if (campaign.getUser().getId() != userDao.findByEmail(jwtUtil.getUserEmail()).getId()
                        && !jwtUtil.isAdmin()) {
                    log.info("Not Same User");
                    return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG,
                            HttpStatus.INTERNAL_SERVER_ERROR);
                }

                List<WithdrawalRequestWrapper> withdrawalRequest = withdrawalRequestDao
                        .findByCampaignId(Long.parseLong(requestMap.get("campaignId")));

                if (withdrawalRequest.size() > 0) {
                    return Bp3fUtils.getResponseEntity("Request Already Present.", HttpStatus.BAD_REQUEST);
                }

                if (campaign.getAmountRecieved() < campaign.getAmountWithdrawn()
                        + Long.parseLong(requestMap.get("withdrawAmount"))) {
                    return Bp3fUtils.getResponseEntity("Not Enough Balance.", HttpStatus.BAD_REQUEST);
                }

                withdrawalRequestDao.save(getWithdrawalRequestFromMap(requestMap));

                return Bp3fUtils.getResponseEntity("Withdrawal Request Sent For Approval.", HttpStatus.OK);
            } else {
                return Bp3fUtils.getResponseEntity(Bp3fConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateaddWithdrawalRequestMap(Map<String, String> requestMap) {
        if (requestMap.containsKey("withdrawAmount") && requestMap.containsKey("campaignId")
                && requestMap.containsKey("userId")) {
            return true;
        }
        return false;
    }

    private WithdrawalRequest getWithdrawalRequestFromMap(Map<String, String> requestMap) throws ParseException {
        WithdrawalRequest withdrawalRequest = new WithdrawalRequest();

        withdrawalRequest.setWithdrawAmount(Long.parseLong(requestMap.get("withdrawAmount")));
        withdrawalRequest.setApproved(false);

        Date date = new Date();
        Date modifiedDate = new SimpleDateFormat("yyyy-MM-dd").parse(new SimpleDateFormat("yyyy-MM-dd").format(date));
        withdrawalRequest.setRequestDate(modifiedDate);

        Campaign campaign = new Campaign();
        campaign.setId(Long.parseLong(requestMap.get("campaignId")));
        withdrawalRequest.setCampaign(campaign);

        User user = new User();
        user.setId(Long.parseLong(requestMap.get("userId")));
        withdrawalRequest.setUser(user);

        return withdrawalRequest;

    }

    @Override
    public ResponseEntity<List<WithdrawalRequestWrapper>> getByCampaignId(Long campaigId) {
        try {
            return new ResponseEntity<>(withdrawalRequestDao.findByCampaignId(campaigId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
