package com.badukigondu.bp3f.serviceImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.dao.WebsiteConstantsDao;
import com.badukigondu.bp3f.jwt.JwtUtil;
import com.badukigondu.bp3f.pojo.WebsiteConstants;
import com.badukigondu.bp3f.service.WebsiteConstantsService;
import com.badukigondu.bp3f.utils.Bp3fUtils;

@Service
public class WebsiteConstantsServiceImpl implements WebsiteConstantsService {

    @Autowired
    WebsiteConstantsDao websiteConstantsDao;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    public ResponseEntity<String> addWebsiteConstants(Map<String, String> requestMap) {
        try {
            if (jwtUtil.isAdmin()) {
                websiteConstantsDao.save(getWebsiteConstantsFromMap(requestMap));
                return Bp3fUtils.getResponseEntity("Website Constants Added Successfully", HttpStatus.OK);
            } else {
                return Bp3fUtils.getResponseEntity(Bp3fConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private WebsiteConstants getWebsiteConstantsFromMap(Map<String, String> requestMap) {
        WebsiteConstants websiteConstants = new WebsiteConstants();

        websiteConstants.setKeyColumn(requestMap.get("key"));
        websiteConstants.setValueColumn(requestMap.get("value"));

        return websiteConstants;
    }

    @Override
    public ResponseEntity<WebsiteConstants> getWebsiteConstantsByKey(String keyColumn) {
        try {
            return new ResponseEntity<>(websiteConstantsDao.findByKeyColumn(keyColumn), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new WebsiteConstants(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateWebsiteConstants(Long id, Map<String, String> requestMap) {
        try {
            if (jwtUtil.isAdmin()) {

                WebsiteConstants websiteConstants = websiteConstantsDao.findById(id).get();

                websiteConstants.setValueColumn(requestMap.get("value"));

                websiteConstantsDao.save(websiteConstants);
                return Bp3fUtils.getResponseEntity("Website Constants Updated Successfully", HttpStatus.OK);
            } else {
                return Bp3fUtils.getResponseEntity(Bp3fConstants.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
