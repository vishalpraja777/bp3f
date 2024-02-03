package com.badukigondu.bp3f.wrapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseWrapper {

    String payment_link_id;
    String payment_link_url;
    String payment_status;

    Long amount;
    String campaignId;
    String donationId;


    
    // String secretKey;
	// String razorpayOrderId;
	// String applicationFee;
	// String secretId;
	// String pgName;

}
