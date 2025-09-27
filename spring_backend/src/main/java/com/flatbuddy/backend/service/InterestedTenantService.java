package com.flatbuddy.backend.service;

import com.flatbuddy.backend.dto.InterestedUserResponse;
import com.flatbuddy.backend.repository.InterestedTenantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterestedTenantService {

    private final InterestedTenantRepository interestedTenantRepository;

    public InterestedTenantService(InterestedTenantRepository interestedTenantRepository) {
        this.interestedTenantRepository = interestedTenantRepository;
    }

    public List<InterestedUserResponse> getInterestedUsers(Integer propertyId) {
        List<Object[]> rows = interestedTenantRepository.findInterestedUsersByPropertyIdNative(propertyId);
        return rows.stream().map(r -> new InterestedUserResponse(
                (Integer) r[0],
                (String) r[1],
                (String) r[2],
                (String) r[3]
        )).toList();
    }

    public Long getInterestedTenantCount(Integer propid) {
        return interestedTenantRepository.countByPropertyId(propid);
    }


}
