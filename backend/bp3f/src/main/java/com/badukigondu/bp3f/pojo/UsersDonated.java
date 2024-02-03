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

@NamedQuery(name = "UsersDonated.findAllDonations", query = "Select new com.badukigondu.bp3f.wrapper.UsersDonatedWrapper(u.id, u.name, u.email, u.mobileNumber, u.paymentStatus, u.isAnonymous, u.amount, u.campaign) from UsersDonated u")

@NamedQuery(name = "UsersDonated.getDonationCampaignId", query = "Select new com.badukigondu.bp3f.wrapper.UsersDonatedWrapper(u.id, u.name, u.email, u.mobileNumber, u.paymentStatus, u.isAnonymous, u.amount, u.campaign) from UsersDonated u where u.campaign.id = :campaignId")

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "usersdonated")
public class UsersDonated implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;
    
    @Column(name = "mobilenumber")
    private String mobileNumber;
        
    @Column(name = "paymentstatus")
    private String paymentStatus;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "isanonymous")
    private Boolean isAnonymous;

    @ManyToOne
    private Campaign campaign;

}
