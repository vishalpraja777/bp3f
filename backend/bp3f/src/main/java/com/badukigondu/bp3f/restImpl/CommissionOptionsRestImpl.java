package com.badukigondu.bp3f.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.pojo.CommissionOptions;
import com.badukigondu.bp3f.rest.CommissionOptionsRest;
import com.badukigondu.bp3f.service.CommissionOptionsService;
import com.badukigondu.bp3f.utils.Bp3fUtils;

@RestController
public class CommissionOptionsRestImpl implements CommissionOptionsRest {

    @Autowired
    CommissionOptionsService commissionOptionsService;

    @Override
    public ResponseEntity<String> addCommission(Map<String, String> requestMap) {
        try {
            return commissionOptionsService.addCampaignCategory(requestMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<CommissionOptions>> getAllCommission() {
        try {
            return commissionOptionsService.getAllCampaignCategory();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteCommission(Long id) {
        try {
            return commissionOptionsService.deleteCampaignCategory(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
