package com.badukigondu.bp3f.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.dao.CommissionOptionsDao;
import com.badukigondu.bp3f.jwt.JwtUtil;
import com.badukigondu.bp3f.pojo.CommissionOptions;
import com.badukigondu.bp3f.service.CommissionOptionsService;
import com.badukigondu.bp3f.utils.Bp3fUtils;

@Service
public class CommissionOptionsServiceImpl implements CommissionOptionsService {

    @Autowired
    CommissionOptionsDao commissionOptionsDao;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    public ResponseEntity<String> addCampaignCategory(Map<String, String> requestMap) {

        try {
            if (jwtUtil.isAdmin()) {
                commissionOptionsDao.save(getCommissionOptionsFromMap(requestMap));
                return Bp3fUtils.getResponseEntity("Category Added Successfully", HttpStatus.OK);
            } else {
                return Bp3fUtils.getResponseEntity(Bp3fConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private CommissionOptions getCommissionOptionsFromMap(Map<String, String> requestMap) {
        CommissionOptions commissionOptions = new CommissionOptions();

        commissionOptions.setCommisionValue(Long.parseLong(requestMap.get("commission")));
        commissionOptions.setStatus(true);

        return commissionOptions;
    }

    @Override
    public ResponseEntity<List<CommissionOptions>> getAllCampaignCategory() {
        try {
            if (jwtUtil.isAdmin()) {
                return new ResponseEntity<>(commissionOptionsDao.findAll(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteCampaignCategory(Long id) {
        try {
            if (jwtUtil.isAdmin()) {
                commissionOptionsDao.deleteById(id);
                return Bp3fUtils.getResponseEntity("Category Deleted Successfully", HttpStatus.OK);
            } else {
                return Bp3fUtils.getResponseEntity(Bp3fConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
