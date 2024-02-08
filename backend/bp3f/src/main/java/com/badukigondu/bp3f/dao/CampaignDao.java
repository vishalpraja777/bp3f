package com.badukigondu.bp3f.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;

import com.badukigondu.bp3f.pojo.Campaign;
import com.badukigondu.bp3f.wrapper.CampaignWrapper;

import jakarta.transaction.Transactional;

public interface CampaignDao extends JpaRepository<Campaign, Long> {

    List<CampaignWrapper> findAllCampaign();

    CampaignWrapper getCampaignById(@Param("id") Long id);

    @Transactional
    @Modifying
    void updateAmountRecieved(@Param("amount") Long amount, @Param("id") Long id);

    @Transactional
    @Modifying
    void updateAmountWithdrawn(@Param("amount") Long amount, @Param("id") Long id);

    @Transactional
    @Modifying
    void updateStatus(@Param("status") String status, @Param("id") Long id);

    List<CampaignWrapper> getCampaignByUserId(@Param("userId") Long userId);

    @Transactional
    @Modifying
    void updateCampaignImage(Long id, String imageLink);

}
