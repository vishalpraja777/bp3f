package com.badukigondu.bp3f.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.badukigondu.bp3f.wrapper.CampaignWrapper;

public interface CampaignService {

    ResponseEntity<String> addCampaign(Map<String, String> requestMap, String token);

    ResponseEntity<List<CampaignWrapper>> getAllCampaign();

    ResponseEntity<CampaignWrapper> getCampaignById(Long id);

    ResponseEntity<List<CampaignWrapper>> getCampaignByUserId(Long userId);

    ResponseEntity<String> updateStatus(Long id, Map<String, String> requestMap);

    ResponseEntity<String> updateCampaign(Long id, Map<String, String> requestMap);

    ResponseEntity<String> deleteCampaign(Long id);

    ResponseEntity<String> updateCampaignImage(Long id, Map<String, String> requestMap);

}
