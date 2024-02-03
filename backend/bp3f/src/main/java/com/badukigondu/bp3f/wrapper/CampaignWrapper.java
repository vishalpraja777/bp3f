package com.badukigondu.bp3f.wrapper;

import java.util.Date;

import com.badukigondu.bp3f.pojo.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CampaignWrapper {

    private Long id;

    private String title;

    private String imageLink;

    private String description;

    private String status;

    private String category;

    private Long boost;

    private Long goalAmount;

    private Long amountWithdrawn;

    private Long amountRecieved;

    private Date requiredBy;

    private Long userId;

    // public CampaignWrapper(Long id, String title, String imageLink, String
    // description, Long goalAmount, User userId) {
    // this.id = id;
    // this.title = title;
    // this.imageLink = imageLink;
    // this.description = description;
    // this.goalAmount = goalAmount;
    // this.userId = userId.getId();
    // }

    public CampaignWrapper(Long id, String title, String imageLink, String description, String status, String category,
            Long boost, Long goalAmount, Long amountWithdrawn, Long amountRecieved, Date requiredBy, User userId) {
        this.id = id;
        this.title = title;
        this.imageLink = imageLink;
        this.description = description;
        this.status = status;
        this.category = category;
        this.boost = boost;
        this.goalAmount = goalAmount;
        this.amountRecieved = amountRecieved;
        this.requiredBy = requiredBy;
        this.amountWithdrawn = amountWithdrawn;
        this.userId = userId.getId();
    }

}
