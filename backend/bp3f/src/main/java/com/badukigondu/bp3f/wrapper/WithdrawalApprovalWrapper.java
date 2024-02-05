package com.badukigondu.bp3f.wrapper;

import java.util.Date;

import com.badukigondu.bp3f.pojo.Campaign;
import com.badukigondu.bp3f.pojo.User;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class WithdrawalApprovalWrapper {

    private Long id;

    private Long withdrawAmount;

    private boolean approvedStatus;

    private Date approvedDate;

    private Long campaignId;

    private Long userId;

    public WithdrawalApprovalWrapper(Long id, Long withdrawAmount, boolean approvedStatus, Date approvedDate,
            Campaign campaign, User user) {
        this.id = id;
        this.withdrawAmount = withdrawAmount;
        this.approvedStatus = approvedStatus;
        this.approvedDate = approvedDate;
        this.campaignId = campaign.getId();
        this.userId = user.getId();
    }

}
