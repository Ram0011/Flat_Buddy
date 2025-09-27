package com.flatbuddy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InterestedUserResponse {
    private Integer userId;
    private String uname;
    private String emailid;
    private String contactno;
}
