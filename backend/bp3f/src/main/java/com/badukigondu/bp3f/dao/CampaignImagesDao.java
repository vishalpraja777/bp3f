package com.badukigondu.bp3f.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.badukigondu.bp3f.pojo.CampaignImages;
import com.badukigondu.bp3f.wrapper.CampaignImagesWrapper;

public interface CampaignImagesDao extends JpaRepository<CampaignImages, Long> {

    List<CampaignImagesWrapper> getImageByCampaignId(Long campaignId);
    
}
