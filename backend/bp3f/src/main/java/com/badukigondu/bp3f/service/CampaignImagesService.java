package com.badukigondu.bp3f.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.badukigondu.bp3f.wrapper.CampaignImagesWrapper;

public interface CampaignImagesService {

    ResponseEntity<String> addCampaignImage(Map<String, String> requestMap);

    ResponseEntity<List<CampaignImagesWrapper>> getImageByCampaignId(Long campaignId);

    ResponseEntity<String> deleteCampaignImage(Long id);
    
}
