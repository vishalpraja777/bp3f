package com.badukigondu.bp3f.pojo;

import java.io.Serializable;
import java.util.Date;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import lombok.Data;

@NamedQuery(name = "WithdrawalRequest.findByCampaignId", query = "select new com.badukigondu.bp3f.wrapper.WithdrawalRequestWrapper(w.id, w.withdrawAmount, w.approved, w.requestDate, w.campaign, w.user) from WithdrawalRequest w where w.campaign.id = :campaignId and w.approved = false")

@NamedQuery(name = "WithdrawalRequest.updateApproved", query = "update WithdrawalRequest w set w.approved=:approved where w.id=:id")

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "withdrawal_request")
public class WithdrawalRequest implements Serializable  {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "withdrawal_amount")
    private Long withdrawAmount;

    @Column(name = "approved")
    private Boolean approved;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "requestdate")
    private Date requestDate;

    @ManyToOne
    private Campaign campaign;

    @ManyToOne
    private User user;

}
