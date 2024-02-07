package com.badukigondu.bp3f.restImpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.pojo.WebsiteConstants;
import com.badukigondu.bp3f.rest.WebsiteConstantsRest;
import com.badukigondu.bp3f.service.WebsiteConstantsService;
import com.badukigondu.bp3f.utils.Bp3fUtils;

@RestController
public class WebsiteConstantsRestImpl implements WebsiteConstantsRest {

    @Autowired
    WebsiteConstantsService websiteConstantsService;

    @Override
    public ResponseEntity<String> addWebsiteConstants(Map<String, String> requestMap) {
        try {
            return websiteConstantsService.addWebsiteConstants(requestMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<WebsiteConstants> getWebsiteConstantsByKey(String keyColumn) {
        try {
            return websiteConstantsService.getWebsiteConstantsByKey(keyColumn);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new WebsiteConstants(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateWebsiteConstants(Long id, Map<String, String> requestMap) {
        try {
            return websiteConstantsService.updateWebsiteConstants(id, requestMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
