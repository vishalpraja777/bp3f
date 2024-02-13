package com.badukigondu.bp3f.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.rest.WithdrawalApprovalRest;
import com.badukigondu.bp3f.service.WithdrawalApprovalService;
import com.badukigondu.bp3f.utils.Bp3fUtils;
import com.badukigondu.bp3f.wrapper.WithdrawalApprovalWrapper;

@RestController
public class WithdrawalApprovalRestImpl implements WithdrawalApprovalRest {

    @Autowired
    WithdrawalApprovalService withdrawalApprovalService;

    @Override
    public ResponseEntity<String> addWithdrawApproval(Map<String, String> requestMap) {
        try {
            return withdrawalApprovalService.addWithdrawApproval(requestMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity( Bp3fConstants.SOMETHING_WENT_WRONG , HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<WithdrawalApprovalWrapper>> getByCampaignId(Long campaigId) {
       try {
            return withdrawalApprovalService.getByCampaignId(campaigId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<WithdrawalApprovalWrapper>> getAll() {
        try {
             return withdrawalApprovalService.getAll();
         } catch (Exception e) {
             e.printStackTrace();
         }
         return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
