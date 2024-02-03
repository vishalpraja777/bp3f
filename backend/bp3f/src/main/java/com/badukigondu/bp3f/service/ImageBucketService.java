package com.badukigondu.bp3f.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ImageBucketService {

    ResponseEntity<String> uploadImage(MultipartFile file);
    
}
