package com.badukigondu.bp3f.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.badukigondu.bp3f.constants.Bp3fConstants;
import com.badukigondu.bp3f.service.ImageBucketService;
import com.badukigondu.bp3f.utils.Bp3fUtils;

@Service
public class ImageBucketServiceImpl implements ImageBucketService {

    @Autowired
    private AmazonClient amazonClient;

    @Override
    public ResponseEntity<String> uploadImage(MultipartFile file) {
        try {
            return Bp3fUtils.getResponseEntity(amazonClient.uploadFile(file), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Bp3fUtils.getResponseEntity(Bp3fConstants.SOMETHING_WENT_WRONG, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
