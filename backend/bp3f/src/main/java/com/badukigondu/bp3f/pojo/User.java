package com.badukigondu.bp3f.pojo;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

// @NamedQuery(name = "User.findByEmail", query = "select u from User u where u.email=:email")

@NamedQuery(name = "User.getAllUser", query = "select new com.badukigondu.bp3f.wrapper.UserWrapper(u.id, u.name, u.gender, u.mobileNumber, u.profilePic, u.email, u.panCard, u.aadharCard, u.role, u.status, u.bankName, u.holderName, u.accountNumber, u.ifscCode) from User u where u.role = 'user'")

@NamedQuery(name = "User.getUserByEmail", query = "select new com.badukigondu.bp3f.wrapper.UserWrapper(u.id, u.name, u.gender, u.mobileNumber, u.profilePic, u.email, u.panCard, u.aadharCard, u.role, u.status, u.bankName, u.holderName, u.accountNumber, u.ifscCode) from User u where u.email = :email")

@NamedQuery(name = "User.updateProfilePic", query = "update User u set u.profilePic=:imageLink where u.id=:id")

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "user")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "gender")
    private String gender;

    @Column(name = "mobilenumber", unique = true, nullable = false)
    private String mobileNumber;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "profilepic")
    private String profilePic;

    @Column(name = "pancard")
    private String panCard;

    @Column(name = "aadharcard")
    private String aadharCard;

    @Column(name = "role")
    private String role;

    @Column(name = "status")
    private String status;

    // @OneToOne(cascade = CascadeType.ALL)
    // @JoinColumn(name = "user_bankdetails", referencedColumnName = "id")
    // private BankDetails bankDetails;

    @Column(name = "bankname")
    private String bankName;

    @Column(name = "holdername")
    private String holderName;

    @Column(name = "accountnumber")
    private String accountNumber;

    @Column(name = "ifsccode")
    private String ifscCode;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    // @JoinColumn(name = "user_id")
    private List<Campaign> campaign;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    // @JoinColumn(name = "campaign_images_id")
    private Set<WithdrawalRequest> withdrawalRequest;

}
