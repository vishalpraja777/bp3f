package com.badukigondu.bp3f.rest;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.badukigondu.bp3f.pojo.WebsiteConstants;

@RequestMapping(path = "/websiteConstants")
public interface WebsiteConstantsRest {

    @PostMapping(path = "/add")
    public ResponseEntity<String> addWebsiteConstants(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping(path = "/getByKey/{keyColumn}")
    public ResponseEntity<WebsiteConstants> getWebsiteConstantsByKey(@PathVariable String keyColumn);

    @PostMapping(path = "/update/{id}")
    public ResponseEntity<String> updateWebsiteConstants(@PathVariable Long id,
            @RequestBody(required = true) Map<String, String> requestMap);

}
