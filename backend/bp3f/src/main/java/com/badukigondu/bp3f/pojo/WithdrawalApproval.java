package com.badukigondu.bp3f.pojo;

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

@NamedQuery(name = "WithdrawalApproval.findByCampaignId", query = "select new com.badukigondu.bp3f.wrapper.WithdrawalApprovalWrapper(w.id, w.withdrawAmount, w.approvedStatus, w.approvedDate, w.campaign, w.user) from WithdrawalApproval w where w.campaign.id = :campaigId")

@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "Withdrawal_approval")
public class WithdrawalApproval {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "withdrawal_amount")
    private Long withdrawAmount;

    @Column(name = "approvedstatus")
    private boolean approvedStatus;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "approveddate")
    private Date approvedDate;

    @ManyToOne
    private Campaign campaign;

    @ManyToOne
    private User user;

}
