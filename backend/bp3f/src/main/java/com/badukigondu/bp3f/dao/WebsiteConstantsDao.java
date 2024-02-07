package com.badukigondu.bp3f.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.badukigondu.bp3f.pojo.WebsiteConstants;

public interface WebsiteConstantsDao extends JpaRepository<WebsiteConstants,Long>{

    WebsiteConstants findByKeyColumn(String keyColumn);
    
}
