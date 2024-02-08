package com.badukigondu.bp3f.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@NamedQuery(name = "Campaign.findAllCampaign", query = "Select new com.badukigondu.bp3f.wrapper.CampaignWrapper(c.id, c.title, c.imageLink, c.description, c.status, c.category, c.boost, c.goalAmount, c.amountWithdrawn, c.amountRecieved, c.requiredBy, c.user) from Campaign c")

@NamedQuery(name = "Campaign.getCampaignById", query = "Select new com.badukigondu.bp3f.wrapper.CampaignWrapper(c.id, c.title, c.imageLink, c.description, c.status, c.category, c.boost, c.goalAmount, c.amountWithdrawn, c.amountRecieved, c.requiredBy, c.user) from Campaign c where c.id=:id")

@NamedQuery(name = "Campaign.getCampaignByUserId", query = "Select new com.badukigondu.bp3f.wrapper.CampaignWrapper(c.id, c.title, c.imageLink, c.description, c.status, c.category, c.boost, c.goalAmount, c.amountWithdrawn, c.amountRecieved, c.requiredBy, c.user) from Campaign c where c.user.id=:userId")

@NamedQuery(name = "Campaign.updateAmountRecieved", query = "Update Campaign c set c.amountRecieved=:amount where c.id=:id")

@NamedQuery(name = "Campaign.updateAmountWithdrawn", query = "Update Campaign c set c.amountWithdrawn=:amount where c.id=:id")

@NamedQuery(name = "Campaign.updateStatus", query = "Update Campaign c set c.status=:status where c.id=:id")

@NamedQuery(name = "Campaign.updateCampaignImage", query = "Update Campaign c set c.imageLink=:imageLink where c.id=:id")

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "campaign")
public class Campaign implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "imagelink")
    private String imageLink;

    @Column(name = "description")
    private String description;

    @Column(name = "goalamount")
    private Long goalAmount;

    @Column(name = "amountrecieved")
    private Long amountRecieved;

    @Column(name = "status")
    private String status;

    @Column(name = "category")
    private String category;

    @Column(name = "boost")
    private Long boost;

    @Column(name = "amountwithdrawn")
    private Long amountWithdrawn;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "requiredby")
    private Date requiredBy;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    // @JoinColumn(name = "users_donated_campaign_id")
    private Set<UsersDonated> usersdonated;

    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    // @JoinColumn(name = "campaign_images_id")
    private Set<CampaignImages> campaignImages;

    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL, orphanRemoval = true)
    // @JoinColumn(name = "campaign_images_id")
    private Set<WithdrawalRequest> withdrawalRequest;

}
