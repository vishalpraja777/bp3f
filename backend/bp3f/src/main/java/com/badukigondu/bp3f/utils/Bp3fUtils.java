package com.badukigondu.bp3f.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Bp3fUtils {
    
    private Bp3fUtils(){

    }

    public static ResponseEntity<String> getResponseEntity(String message, HttpStatus httpStatus){
        return new ResponseEntity<>("{\"message\":\"" + message + "\"}", httpStatus);
    }

}
