package com.badukigondu.bp3f.serviceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.dao.CampaignImagesDao;
import com.badukigondu.bp3f.pojo.Campaign;
import com.badukigondu.bp3f.pojo.CampaignImages;
import com.badukigondu.bp3f.service.CampaignImagesService;
import com.badukigondu.bp3f.utils.Bp3fUtils;
import com.badukigondu.bp3f.wrapper.CampaignImagesWrapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CampaignImagesServiceImpl implements CampaignImagesService {

    @Autowired
    CampaignImagesDao campaignImagesDao;

    @Override
    public ResponseEntity<String> addCampaignImage(Map<String, String> requestMap) {
        try {
            log.info("Inside Campaign Image Service");
            if (validateCampaignMap(requestMap)) {
                campaignImagesDao.save(getCampaignFromMap(requestMap));
                return Bp3fUtils.getResponseEntity("Campaign Image Added Successfully", HttpStatus.OK);
            } else {
                return Bp3fUtils.getResponseEntity(Bp3fConstants.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateCampaignMap(Map<String, String> requestMap) {
        if (requestMap.containsKey("imageLink") && requestMap.containsKey("imageTitle")) {
            return true;
        }
        return false;
    }

    private CampaignImages getCampaignFromMap(Map<String, String> requestMap) {

        CampaignImages campaignImages = new CampaignImages();

        Campaign campaign = new Campaign();

        campaignImages.setImageTitle(requestMap.get("imageTitle"));
        campaignImages.setImageDescription(requestMap.get("imageDescription"));
        campaignImages.setImageLink(requestMap.get("imageLink"));
        campaignImages.setImageCategory(requestMap.get("imageCategory"));

        campaign.setId(Long.parseLong(requestMap.get("campaignId")));

        campaignImages.setCampaign(campaign);

        return campaignImages;

    }

    @Override
    public ResponseEntity<List<CampaignImagesWrapper>> getImageByCampaignId(Long campaignId) {
        try {
            return new ResponseEntity<>(campaignImagesDao.getImageByCampaignId(campaignId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteCampaignImage(Long id) {
        try {
            campaignImagesDao.deleteById(id);
        return Bp3fUtils.getResponseEntity("Campaign Image Deleted.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
