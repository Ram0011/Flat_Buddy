package com.flatbuddy.backend.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PropertyResponse {
    private Integer propertyid;
    private int capacity;
    private int userid;
    private String flatType;
    private String location;
    private String amenities;
    private Float rent;
    private int status;
    private int cityid;
    private List<String> photoUrls;
    private List<String> preferences;
    private Long interestedTenantCount;
    private UserInfo user;

}
