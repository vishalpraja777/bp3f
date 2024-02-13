package com.badukigondu.bp3f.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.rest.WithdrawalRequestRest;
import com.badukigondu.bp3f.service.WithdrawalRequestService;
import com.badukigondu.bp3f.utils.Bp3fUtils;
import com.badukigondu.bp3f.wrapper.WithdrawalRequestWrapper;

@RestController
public class WithdrawalRequestRestImpl implements WithdrawalRequestRest {

    @Autowired
    WithdrawalRequestService withdrawalRequestService;

    @Override
    public ResponseEntity<String> addWithdrawalRequest(Map<String, String> requestMap) {
        try {
            return withdrawalRequestService.addWithdrawalRequest(requestMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<WithdrawalRequestWrapper>> getByCampaignId(Long campaigId) {
        try {
            return withdrawalRequestService.getByCampaignId(campaigId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<WithdrawalRequestWrapper>> getAll() {
        try {
            return withdrawalRequestService.getAll();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
