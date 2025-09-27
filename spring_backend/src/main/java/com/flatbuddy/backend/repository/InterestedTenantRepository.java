package com.flatbuddy.backend.repository;

import com.flatbuddy.backend.dto.InterestedUserResponse;
import com.flatbuddy.backend.entity.InterestedTenant;
import com.flatbuddy.backend.entity.InterestedTenantId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InterestedTenantRepository extends JpaRepository<InterestedTenant, InterestedTenantId> {

    Optional<InterestedTenant> findById_UseridAndId_Propid(Integer userid, Integer propid);

    long countById_Propid(Integer propid);

    @Query(value = "SELECT u.userid, u.uname, u.emailid, u.contactno FROM user u JOIN interested_tenant it ON it.userid = u.userid WHERE it.propid = :propertyId", nativeQuery = true)
    List<Object[]> findInterestedUsersByPropertyIdNative(Integer propertyId);

    @Query("SELECT COUNT(t) FROM InterestedTenant t WHERE t.property.propertyid = :propid")
    Long countByPropertyId(@Param("propid") Integer propertyId);

}
