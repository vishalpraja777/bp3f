package com.badukigondu.bp3f.service;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.badukigondu.bp3f.pojo.User;
import com.badukigondu.bp3f.wrapper.UserWrapper;

public interface UserService {

    ResponseEntity<String> signUp(Map<String, String> requestMap);

    ResponseEntity<String> login(Map<String, String> requestMap);

    ResponseEntity<List<UserWrapper>> getAllUser();

    ResponseEntity<UserWrapper> getUserByEmail(String email);

    ResponseEntity<String> updateInfo(Long id, Map<String, String> requestMap);

    ResponseEntity<String> updateProfilePic(Long id, Map<String, String> requestMap);

    ResponseEntity<String> updateStatus(Long id, Map<String, String> requestMap);

    ResponseEntity<UserWrapper> findById(Long id);
    
}
