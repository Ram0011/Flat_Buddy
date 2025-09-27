package com.flatbuddy.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "City")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cityid")
    private Integer cityid;

    @Column(name = "cityname")
    private String cityname;

    // Constructors
    public City() {
    }

    public City(Integer cityid, String cityname) {
        this.cityid = cityid;
        this.cityname = cityname;
    }

    // Getters and setters
    public Integer getCityid() {
        return cityid;
    }

    public void setCityid(Integer cityid) {
        this.cityid = cityid;
    }

    public String getCityname() {
        return cityname;
    }

    public void setCityname(String cityname) {
        this.cityname = cityname;
    }
}
