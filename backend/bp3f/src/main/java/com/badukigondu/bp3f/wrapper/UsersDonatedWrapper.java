package com.badukigondu.bp3f.wrapper;

import com.badukigondu.bp3f.pojo.Campaign;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UsersDonatedWrapper {
    private Long id;

    private String name;

    private String email;
    
    private String mobileNumber;

    private String paymentStatus;

    private Long amount;

    private Boolean isAnonymous;

    private Long campaignId;

    public UsersDonatedWrapper(Long id, String name, String email, String mobileNumber, String paymentStatus, Boolean isAnonymous, Long amount, Campaign campaign) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.paymentStatus = paymentStatus;
        this.isAnonymous = isAnonymous;
        this.amount = amount;
        this.campaignId = campaign.getId();
    }


}
