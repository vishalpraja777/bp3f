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

import com.badukigondu.bp3f.pojo.CommissionOptions;

@RequestMapping(path = "/commission")
public interface CommissionOptionsRest {

    @PostMapping(path = "/add")
    public ResponseEntity<String> addCommission(@RequestBody(required = true) Map<String, String> requestMap);

    @GetMapping(path = "/getAll")
    public ResponseEntity<List<CommissionOptions>> getAllCommission();

    @PostMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteCommission(@PathVariable Long id);

}
