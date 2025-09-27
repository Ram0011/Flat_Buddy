package com.flatbuddy.backend.entity;

import com.flatbuddy.backend.entity.City;
import com.flatbuddy.backend.entity.InterestedTenant;
import com.flatbuddy.backend.entity.Preference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "property")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer propertyid;

    private int capacity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cityid", nullable = false)
    private City city;

    @Column(length = 50)
    private String flattype;

    @Column(length = 255)
    private String location;

    @Column(nullable = false)
    private Integer userid;

    @Column(length = 255)
    private String amenities;

    @Column(length = 10000)
    private String photos;

    @Transient
    private List<String> photoList;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<InterestedTenant> interestedTenants = new ArrayList<>();

    public List<String> getPhotoList() {
        if (photos != null && !photos.isEmpty()) {
            return Arrays.asList(photos.split(","));
        }
        return List.of();
    }

    private float rent;

    @Builder.Default
    private int status = 1;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Preference> preferences = new ArrayList<>();
}
