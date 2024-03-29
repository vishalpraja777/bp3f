package com.badukigondu.bp3f.wrapper;

import java.util.Date;

import com.badukigondu.bp3f.pojo.Campaign;
import com.badukigondu.bp3f.pojo.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WithdrawalRequestWrapper {
    
    private Long id;

    private Long withdrawAmount;

    private Boolean approved;

    private Date requestDate;

    private Long campaignId;

    private Long userId;

    public WithdrawalRequestWrapper(Long id, Long withdrawAmount, Boolean approved, Date requestDate, Campaign campaign, User user) {
        this.id = id;
        this.withdrawAmount = withdrawAmount;
        this.approved = approved;
        this.requestDate = requestDate;
        this.campaignId = campaign.getId();
        this.userId = user.getId();
    }



}
