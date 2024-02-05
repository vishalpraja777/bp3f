package com.badukigondu.bp3f.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.badukigondu.bp3f.pojo.WithdrawalApproval;
import com.badukigondu.bp3f.wrapper.WithdrawalApprovalWrapper;

public interface WithdrawalApprovalDao extends JpaRepository<WithdrawalApproval, Long>{

    List<WithdrawalApprovalWrapper> findByCampaignId(Long campaigId);
    
}
