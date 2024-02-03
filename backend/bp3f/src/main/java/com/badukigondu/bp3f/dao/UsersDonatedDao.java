package com.badukigondu.bp3f.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.badukigondu.bp3f.pojo.UsersDonated;
import com.badukigondu.bp3f.wrapper.UsersDonatedWrapper;

public interface UsersDonatedDao extends JpaRepository<UsersDonated, Long> {

    List<UsersDonatedWrapper> findAllDonations();

    List<UsersDonatedWrapper> getDonationCampaignId(Long campaignId);
    
}
