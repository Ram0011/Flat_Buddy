package com.flatbuddy.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user") // table name is 'user'
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    private Integer userid;

    @Column(name = "pwd", nullable = false, length = 255)
    private String pwd;

    @Column(name = "uname", nullable = false, length = 100, unique = true)
    private String uname;

    @Column(name = "gender", nullable = false, length = 10)
    private String gender;

    @Column(name = "emailid", nullable = false, length = 50)
    private String emailid;

    @Column(name = "contactno", nullable = false, length = 50)
    private String contactno;

    @Column(name = "profession", nullable = false, length = 50)
    private String profession;

    @Column(name = "cityid")
    private Integer cityid;

    @Column(name = "roleid")
    private Integer roleid;

    public User() {}

    public User(String pwd, String uname, String gender, String emailid,
                String contactno, String profession, Integer cityid, Integer roleid) {
        this.pwd = pwd;
        this.uname = uname;
        this.gender = gender;
        this.emailid = emailid;
        this.contactno = contactno;
        this.profession = profession;
        this.cityid = cityid;
        this.roleid = roleid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }

    public String getContactno() {
        return contactno;
    }

    public void setContactno(String contactno) {
        this.contactno = contactno;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public Integer getCityid() {
        return cityid;
    }

    public void setCityid(Integer cityid) {
        this.cityid = cityid;
    }

    public Integer getRoleid() {
        return roleid;
    }

    public void setRoleid(Integer roleid) {
        this.roleid = roleid;
    }
}
