package com.badukigondu.bp3f.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserWrapper {

    private Long id;

    private String name;

    private String gender;

    private String mobileNumber;

    private String profilePic;

    private String email;

    private String panCard;

    private String aadharCard;

    private String role;

    private String status;

    private String bankName;

    private String holderName;

    private String accountNumber;

    private String ifscCode;

    public UserWrapper(Long id, String name, String gender, String mobileNumber, String profilePic, String email,
            String panCard, String aadharCard, String role, String status,String bankName, String holderName, String accountNumber,
            String ifscCode) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.profilePic = profilePic;
        this.email = email;
        this.panCard = panCard;
        this.aadharCard = aadharCard;
        this.bankName = bankName;
        this.holderName = holderName;
        this.accountNumber = accountNumber;
        this.ifscCode = ifscCode;
        this.role = role;
        this.status = status;
    }

}
