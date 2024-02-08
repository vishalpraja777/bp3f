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
import com.badukigondu.bp3f.dao.WithdrawalApprovalDao;
import com.badukigondu.bp3f.dao.WithdrawalRequestDao;
import com.badukigondu.bp3f.jwt.JwtUtil;
import com.badukigondu.bp3f.pojo.Campaign;
import com.badukigondu.bp3f.pojo.User;
import com.badukigondu.bp3f.pojo.WithdrawalApproval;
import com.badukigondu.bp3f.pojo.WithdrawalRequest;
import com.badukigondu.bp3f.service.WithdrawalApprovalService;
import com.badukigondu.bp3f.utils.Bp3fUtils;
import com.badukigondu.bp3f.wrapper.WithdrawalApprovalWrapper;

@Service
public class WithdrawalApprovalServiceImpl implements WithdrawalApprovalService {

    @Autowired
    WithdrawalApprovalDao withdrawalApprovalDao;

    @Autowired
    WithdrawalRequestDao withdrawalRequestDao;

    @Autowired
    CampaignDao campaignDao;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    public ResponseEntity<String> addWithdrawApproval(Map<String, String> requestMap) {
        try {
            if (validateaddWithdrawalApprovalMap(requestMap) && jwtUtil.isAdmin()) {

                withdrawalApprovalDao.save(getWithdrawalApprovalFromMap(requestMap));

                withdrawalRequestDao.updateApproved(Long.parseLong(requestMap.get("withdrawalRequestId")), true);

                return Bp3fUtils.getResponseEntity("Withdraw Request Approved", HttpStatus.OK);

            } else {
                return Bp3fUtils.getResponseEntity(Bp3fConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateaddWithdrawalApprovalMap(Map<String, String> requestMap) {
        if (requestMap.containsKey("withdrawalRequestId")) {
            return true;
        }
        return false;
    }

    private WithdrawalApproval getWithdrawalApprovalFromMap(Map<String, String> requestMap) throws ParseException {

        WithdrawalRequest withdrawalRequest = withdrawalRequestDao
                .findById(Long.parseLong(requestMap.get("withdrawalRequestId"))).get();

        WithdrawalApproval withdrawalApproval = new WithdrawalApproval();

        withdrawalApproval.setWithdrawAmount(withdrawalRequest.getWithdrawAmount());
        withdrawalApproval.setApprovedStatus(true);

        Date date = new Date();
        Date modifiedDate = new SimpleDateFormat("yyyy-MM-dd").parse(new SimpleDateFormat("yyyy-MM-dd").format(date));
        withdrawalApproval.setApprovedDate(modifiedDate);

        withdrawalApproval.setCampaign(withdrawalRequest.getCampaign());

        withdrawalApproval.setUser(withdrawalRequest.getUser());

        Long amountWithdrawn = campaignDao.findById(withdrawalRequest.getCampaign().getId()).get().getAmountWithdrawn() + withdrawalRequest.getWithdrawAmount();

        campaignDao.updateAmountWithdrawn(amountWithdrawn,withdrawalRequest.getCampaign().getId());

        return withdrawalApproval;

    }

    @Override
    public ResponseEntity<List<WithdrawalApprovalWrapper>> getByCampaignId(Long campaigId) {
        try {
            return new ResponseEntity<>(withdrawalApprovalDao.findByCampaignId(campaigId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
