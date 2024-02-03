package com.badukigondu.bp3f.restImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.rest.ImageBucketRest;
import com.badukigondu.bp3f.service.ImageBucketService;
import com.badukigondu.bp3f.utils.Bp3fUtils;

@RestController
public class ImageBucketRestImpl implements ImageBucketRest {

    @Autowired
    ImageBucketService imageBucketService;

    @Override
    public ResponseEntity<String> uploadImage(MultipartFile file) {
        try {
            return imageBucketService.uploadImage(file);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
}
