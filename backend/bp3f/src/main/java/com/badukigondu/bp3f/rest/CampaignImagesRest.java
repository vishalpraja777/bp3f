package com.badukigondu.bp3f.rest;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.badukigondu.bp3f.wrapper.CampaignImagesWrapper;

@RequestMapping(path = "/campaignImages")
public interface CampaignImagesRest {

    @PostMapping("/add")
    public ResponseEntity<String> addCampaignImage(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping("/getImageByCampaignId/{campaignId}")
    public ResponseEntity<List<CampaignImagesWrapper>> getImageByCampaignId(@PathVariable(name = "campaignId") Long campaignId);

    @PostMapping("delete/{id}")
    public ResponseEntity<String> deleteCampaignImage(@PathVariable Long id);


}
