package com.badukigondu.bp3f.rest;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.badukigondu.bp3f.wrapper.UserWrapper;

@RequestMapping(path = "/user")
public interface UserRest {

    @GetMapping(path = "/test")
    public ResponseEntity<String> testApi();

    @PostMapping(path = "/signup")
    public ResponseEntity<String> signUp(@RequestBody(required = true) Map<String, String> requestMap);

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody(required = true) Map<String, String> requestMap);

    @PostMapping(path = "/updateInfo/{id}")
    public ResponseEntity<String> updateInfo(@PathVariable(name = "id") Long id,@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping(path = "/getAll")
    public ResponseEntity<List<UserWrapper>> getAllUser();

    @GetMapping(path = "/get/{email}")
    public ResponseEntity<UserWrapper> getUserByEmail(@PathVariable(name = "email") String email);

    @PostMapping(path = "/updateProfilePic/{id}")
    public ResponseEntity<String> updateProfilePic(@PathVariable(name = "id") Long id,@RequestBody(required = true) Map<String, String> requestMap);

}
