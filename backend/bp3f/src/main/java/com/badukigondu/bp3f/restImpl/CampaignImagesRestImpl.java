package com.badukigondu.bp3f.restImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.rest.CampaignImagesRest;
import com.badukigondu.bp3f.service.CampaignImagesService;
import com.badukigondu.bp3f.utils.Bp3fUtils;
import com.badukigondu.bp3f.wrapper.CampaignImagesWrapper;

@RestController
public class CampaignImagesRestImpl implements CampaignImagesRest {

    @Autowired
    CampaignImagesService campaignImagesService;

    @Override
    public ResponseEntity<String> addCampaignImage(Map<String, String> requestMap) {
        try {
            return campaignImagesService.addCampaignImage(requestMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<CampaignImagesWrapper>> getImageByCampaignId(Long campaignId) {
        try {
            return campaignImagesService.getImageByCampaignId(campaignId);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteCampaignImage(Long id) {
        try {
            return campaignImagesService.deleteCampaignImage(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR); 
    }

}
