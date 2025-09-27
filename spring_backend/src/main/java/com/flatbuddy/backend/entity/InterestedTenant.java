package com.flatbuddy.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "interested_tenant")
public class InterestedTenant {

    @EmbeddedId
    private InterestedTenantId id;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "duration")
    private Integer duration;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("propid") // part of composite key
    @JoinColumn(name = "propid", nullable = false)
    private Property property;

    public InterestedTenant() {}

    public InterestedTenant(InterestedTenantId id, LocalDate date, Integer duration) {
        this.id = id;
        this.date = date;
        this.duration = duration;
    }

    // Getters and Setters
    public InterestedTenantId getId() {
        return id;
    }

    public void setId(InterestedTenantId id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
}
