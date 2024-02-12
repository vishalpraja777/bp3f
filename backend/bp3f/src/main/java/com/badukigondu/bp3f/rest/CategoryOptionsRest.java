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

import com.badukigondu.bp3f.pojo.CategoryOptions;

@RequestMapping(path = "/campaignCategory")
public interface CategoryOptionsRest {

    @PostMapping(path = "/add")
    public ResponseEntity<String> addCampaignCategory(@RequestBody(required = true) Map<String,String> requestMap);

    @GetMapping(path = "/getAll")
    public ResponseEntity<List<CategoryOptions>> getAllCampaignCategory();
    
    @PostMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteCampaignCategory(@PathVariable Long id);
    
}
