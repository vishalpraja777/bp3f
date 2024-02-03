package com.badukigondu.bp3f.rest;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

import com.badukigondu.bp3f.wrapper.CampaignWrapper;

@RequestMapping(path = "/campaign")
public interface CampaignRest {

    @PostMapping("/add")
    public ResponseEntity<String> addCampaign(@RequestBody(required = true) Map<String, String> requestMap, @RequestHeader("Authorization") String token);

    @GetMapping("/getAll")
    public ResponseEntity<List<CampaignWrapper>> getAllCampaign();

    @GetMapping("/get/{id}")
    public ResponseEntity<CampaignWrapper> getCampaignById(@PathVariable Long id);

    @GetMapping("/getCampaignByUserId/{userId}")
    public ResponseEntity<List<CampaignWrapper>> getCampaignByUserId(@PathVariable Long userId);

    @PostMapping("/updateStatus/{id}")
    public ResponseEntity<String> updateStatus(@PathVariable Long id, @RequestBody(required = true) Map<String, String> requestMap);

    @PostMapping("/updateCampaignImage/{id}")
    public ResponseEntity<String> updateCampaignImage(@PathVariable Long id, @RequestBody(required = true) Map<String, String> requestMap);

    @PostMapping("/update/{id}")
    public ResponseEntity<String> updateCampaign(@PathVariable Long id, @RequestBody(required = true) Map<String, String> requestMap);

    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deleteCampaign(@PathVariable Long id);
}
