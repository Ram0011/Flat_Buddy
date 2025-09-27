package com.flatbuddy.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Entity
@Table(name = "PreferenceList")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Preference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer prefid;

    @Column(nullable = false)
    private Boolean fitness;

    @Column(nullable = false)
    private Boolean nightowl;

    @Column(nullable = false)
    private Boolean smoker;

    @Column(nullable = false)
    private Boolean nonalcoholic;

    @Column(nullable = false)
    private Boolean vegetarian;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "propertyid", nullable = false)
    private Property property;
}