package com.badukigondu.bp3f.pojo;

import java.io.Serializable;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import lombok.Data;


@NamedQuery(name = "CampaignImages.getImageByCampaignId", query = "Select new com.badukigondu.bp3f.wrapper.CampaignImagesWrapper(c.id, c.imageLink, c.imageTitle, c.imageDescription, c.imageCategory, c.campaign) from CampaignImages c where c.campaign.id=:campaignId")

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "campaign_images")
public class CampaignImages implements Serializable  {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "imagelink")
    private String imageLink;

    @Column(name = "imagetitle")
    private String imageTitle;

    @Column(name = "imagedescription")
    private String imageDescription;

    @Column(name = "imagecategory")
    private String imageCategory;

    @ManyToOne
    private Campaign campaign;

}
