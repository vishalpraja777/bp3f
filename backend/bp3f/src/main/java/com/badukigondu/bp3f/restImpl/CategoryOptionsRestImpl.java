package com.badukigondu.bp3f.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.pojo.CategoryOptions;
import com.badukigondu.bp3f.rest.CategoryOptionsRest;
import com.badukigondu.bp3f.service.CategoryOptionsService;
import com.badukigondu.bp3f.utils.Bp3fUtils;

@RestController
public class CategoryOptionsRestImpl implements CategoryOptionsRest {

    @Autowired
    CategoryOptionsService categoryOptionsService;

    @Override
    public ResponseEntity<String> addCampaignCategory(Map<String, String> requestMap) {
        try {
            return categoryOptionsService.addCampaignCategory(requestMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<CategoryOptions>> getAllCampaignCategory() {
        try {
            return categoryOptionsService.getAllCampaignCategory();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteCampaignCategory(Long id) {
        try {
            return categoryOptionsService.deleteCampaignCategory(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
