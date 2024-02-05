package com.badukigondu.bp3f.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.badukigondu.bp3f.pojo.WithdrawalRequest;
import com.badukigondu.bp3f.wrapper.WithdrawalRequestWrapper;

import jakarta.transaction.Transactional;

public interface WithdrawalRequestDao extends JpaRepository<WithdrawalRequest, Long> {

    List<WithdrawalRequestWrapper> findByCampaignId(long campaignId);

    @Transactional
    @Modifying
    void updateApproved(Long id, boolean approved);

}
