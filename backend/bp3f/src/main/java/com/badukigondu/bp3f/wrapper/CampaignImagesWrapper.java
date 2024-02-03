package com.badukigondu.bp3f.wrapper;

import com.badukigondu.bp3f.pojo.Campaign;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CampaignImagesWrapper {
    
    private Long id;

    private String imageLink;

    private String imageTitle;

    private String imageDescription;

    private String imageCategory;

    private Long campaignId;

    public CampaignImagesWrapper(Long id, String imageLink, String imageTitle, String imageDescription,
            String imageCategory, Campaign campaignId) {
        this.id = id;
        this.imageLink = imageLink;
        this.imageTitle = imageTitle;
        this.imageDescription = imageDescription;
        this.imageCategory = imageCategory;
        this.campaignId = campaignId.getId();
    }

    

}
