package com.flatbuddy.backend.service;

import com.flatbuddy.backend.dto.PropertyRequest;
import com.flatbuddy.backend.dto.PropertyResponse;
import com.flatbuddy.backend.dto.UserInfo;
import com.flatbuddy.backend.entity.*;
import com.flatbuddy.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private PreferenceRepository preferenceRepository;

    @Autowired
    private InterestedTenantRepository interestedTenantRepository;

    @Autowired
    private UserRepository userRepository;

    public Property createProperty(PropertyRequest request) throws IOException {
        List<String> urls = cloudinaryService.uploadImages(request.getImages());

        City city = cityRepository.findById(request.getCityid())
                .orElseThrow(() -> new RuntimeException("Invalid city ID"));

        Property property = Property.builder()
                .capacity(request.getCapacity())
                .flattype(request.getFlatType())
                .location(request.getLocation())
                .amenities(request.getAmenities())
                .photos(String.join(",", urls))
                .rent(request.getRent())
                .city(city)
                .userid(request.getUserid())
                .build();

        Property savedProperty = propertyRepository.save(property);

        Preference preference = Preference.builder()
                .fitness(false)
                .nightowl(false)
                .smoker(false)
                .nonalcoholic(true)
                .vegetarian(true)
                .property(savedProperty)
                .build();
        preferenceRepository.save(preference);

        return savedProperty;
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public List<PropertyResponse> getPropertiesByUser(Integer userid) {
        List<Property> properties = propertyRepository.findByUserid(userid);
        return properties.stream().map(p -> {
            Integer propid = p.getPropertyid().intValue();
            long interestCount = interestedTenantRepository.countById_Propid(propid);

            // ✅ Fetch user
            User user = userRepository.findById(p.getUserid())
                    .orElseThrow(() -> new RuntimeException("User not found with id: " + p.getUserid()));

            return PropertyResponse.builder()
                    .propertyid(p.getPropertyid())
                    .capacity(p.getCapacity())
                    .userid(p.getUserid())
                    .flatType(p.getFlattype())
                    .location(p.getLocation())
                    .amenities(p.getAmenities())
                    .rent(p.getRent())
                    .status(p.getStatus())
                    .cityid(p.getCity().getCityid())
                    .photoUrls(p.getPhotoList())
                    .interestedTenantCount(interestCount)
                    .user(UserInfo.builder()
                            .userid(user.getUserid())
                            .uname(user.getUname())
                            .gender(user.getGender())
                            .emailid(user.getEmailid())
                            .contactno(user.getContactno())
                            .profession(user.getProfession())
                            .build())
                    .build();
        }).collect(Collectors.toList());
    }


    public boolean deleteProperty(Integer propertyId) {
        Optional<Property> optional = propertyRepository.findById(propertyId);
        if (optional.isPresent()) {
            propertyRepository.deleteById(propertyId);
            return true;
        }
        return false;
    }

    public List<PropertyResponse> getAllPropertyResponses() {
        return propertyRepository.findAll().stream()
                .map(property -> {
                    User user = userRepository.findById(property.getUserid())
                            .orElse(null);

                    UserInfo userInfo = null;
                    if (user != null) {
                        userInfo = UserInfo.builder()
                                .userid(user.getUserid())
                                .uname(user.getUname())
                                .gender(user.getGender())
                                .emailid(user.getEmailid())
                                .contactno(user.getContactno())
                                .profession(user.getProfession())
                                .build();
                    }
                    return PropertyResponse.builder()
                            .propertyid(property.getPropertyid())
                            .capacity(property.getCapacity())
                            .userid(property.getUserid())
                            .flatType(property.getFlattype())
                            .location(property.getLocation())
                            .amenities(property.getAmenities())
                            .rent(property.getRent())
                            .status(property.getStatus())
                            .cityid(property.getCity().getCityid())
                            .photoUrls(property.getPhotoList())
                            .user(userInfo)
                            .build();
                })
                .collect(Collectors.toList());
    }


    public List<Property> getPropertiesByStatus(int status) {
        List<Property> properties = propertyRepository.findByStatus(status);
        properties.forEach(property -> {
            property.getPreferences().size(); // Trigger lazy loading if needed
        });
        return properties;
    }

    @Transactional
    public boolean showInterest(Integer userid, Integer propid) {
        InterestedTenantId id = new InterestedTenantId(userid, propid);

        // Check if already exists
        if (interestedTenantRepository.existsById(id)) {
            return false; // already interested
        }

        // Fetch property
        Property property = propertyRepository.findById(propid)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        InterestedTenant interest = new InterestedTenant();
        interest.setId(id);
        interest.setProperty(property);
        interest.setDate(LocalDate.now());
        interest.setDuration(3);

        interestedTenantRepository.save(interest);
        return true;
    }

    public Optional<PropertyResponse> getPropertyById(Integer propertyid) {
        return propertyRepository.findById(propertyid)
                .map(property -> {
                    User user = userRepository.findById(property.getUserid())
                            .orElse(null);

                    UserInfo userInfo = null;
                    if (user != null) {
                        userInfo = UserInfo.builder()
                                .userid(user.getUserid())
                                .uname(user.getUname())
                                .gender(user.getGender())
                                .emailid(user.getEmailid())
                                .contactno(user.getContactno())
                                .profession(user.getProfession())
                                .build();
                    }

                    return PropertyResponse.builder()
                            .propertyid(property.getPropertyid())
                            .capacity(property.getCapacity())
                            .userid(property.getUserid())
                            .flatType(property.getFlattype())
                            .location(property.getLocation())
                            .amenities(property.getAmenities())
                            .rent(property.getRent())
                            .status(property.getStatus())
                            .cityid(property.getCity().getCityid())
                            .photoUrls(property.getPhotoList())
                            .user(userInfo)
                            .build();
                });
    }


    public List<Property> searchProperties(Integer cityid, Float maxRent) {
        return propertyRepository.findAll().stream()
                .filter(p -> cityid == null || p.getCity().getCityid().equals(cityid))
                .filter(p -> maxRent == null || p.getRent() <= maxRent)
                .collect(Collectors.toList());
    }

    public boolean grantProperty(Integer propertyId) {
        Optional<Property> propertyOpt = propertyRepository.findById(propertyId);
        if (propertyOpt.isPresent()) {
            Property property = propertyOpt.get();
            if (property.getStatus() != 0) { // Only update if not already granted
                property.setStatus(0);
                propertyRepository.save(property);
                return true;
            }
        }
        return false;
    }


    @Transactional
    public boolean releaseProperty(Integer propertyId) {
        Optional<Property> propertyOpt = propertyRepository.findById(propertyId);
        if (propertyOpt.isPresent()) {
            Property property = propertyOpt.get();
            if (property.getStatus() == 0) { // Only update if currently booked
                property.setStatus(1); // available again
                propertyRepository.save(property);
                return true;
            }
        }
        return false;
    }
}