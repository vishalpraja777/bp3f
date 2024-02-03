package com.badukigondu.bp3f.pojo;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import lombok.Data;

@NamedQuery(name = "WithdrawalRequest.findByCampaignId", query = "select new com.badukigondu.bp3f.wrapper.WithdrawalRequestWrapper(w.id, w.withdrawAmount, w.approved, w.campaign, w.user) from WithdrawalRequest w where w.campaign.id = :campaignId")


@Data
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "withdrawal_request")
public class WithdrawalRequest {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "withdrawal_amount")
    private Long withdrawAmount;

    @Column(name = "approved")
    private Boolean approved;

    @ManyToOne
    private Campaign campaign;

    @ManyToOne
    private User user;

}
