package com.backend.payment.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
public class BillingKeyResponseDto {

        @JsonProperty("mId")
        private String mId;

        @JsonProperty("customerKey")
        private String customerKey;

        @JsonProperty("authenticatedAt")
        private String authenticatedAt;

        @JsonProperty("method")
        private String method;

        @JsonProperty("billingKey")
        private String billingKey;

        // nested JSON object
        @JsonProperty("card")
        private Card card;

        // getters and setters

        // inner Card class
        @Getter
        public static class Card {
            @JsonProperty("issuerCode")
            private String issuerCode;

            @JsonProperty("acquirerCode")
            private String acquirerCode;

            @JsonProperty("number")
            private String number;

            @JsonProperty("cardType")
            private String cardType;

            @JsonProperty("ownerType")
            private String ownerType;

            // getters and setters
        }

}
