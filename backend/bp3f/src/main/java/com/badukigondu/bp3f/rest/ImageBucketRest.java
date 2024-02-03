package com.badukigondu.bp3f.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/image")
public interface ImageBucketRest {

    @PostMapping("/uplaodImage")
    public ResponseEntity<String> uploadImage(@RequestPart(value = "file") MultipartFile file);
    
}
