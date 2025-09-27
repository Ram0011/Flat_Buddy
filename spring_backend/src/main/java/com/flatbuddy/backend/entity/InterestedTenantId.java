package com.flatbuddy.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.util.Objects;

@Embeddable
public class InterestedTenantId implements java.io.Serializable {
    @Column(name = "userid")
    private Integer userid;

    @Column(name = "propid")
    private Integer  propid;

    // Constructors, getters, setters, equals, and hashCode...
    public InterestedTenantId() {}

    public InterestedTenantId(Integer userid, Integer  propid) {
        this.userid = userid;
        this.propid = propid;
    }

    public Integer getUserid() { return userid; }
    public void setUserid(Integer userid) { this.userid = userid; }
    public Integer  getPropid() { return propid; }
    public void setPropid(Integer  propid) { this.propid = propid; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InterestedTenantId that = (InterestedTenantId) o;
        return Objects.equals(userid, that.userid) && Objects.equals(propid, that.propid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userid, propid);
    }
}