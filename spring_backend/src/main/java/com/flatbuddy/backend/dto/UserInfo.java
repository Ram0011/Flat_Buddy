package com.flatbuddy.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    private Integer userid;
    private String uname;
    private String gender;
    private String emailid;
    private String contactno;
    private String profession;


}
