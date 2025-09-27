package com.flatbuddy.backend.controller;

import com.flatbuddy.backend.dto.InterestRequest;
import com.flatbuddy.backend.dto.InterestedUserResponse;
import com.flatbuddy.backend.dto.PropertyRequest;
import com.flatbuddy.backend.dto.PropertyResponse;
import com.flatbuddy.backend.entity.Property;
import com.flatbuddy.backend.service.InterestedTenantService;
import com.flatbuddy.backend.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @Autowired
    private InterestedTenantService interestedTenantService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/create")
    public ResponseEntity<?> createListing(
            @RequestParam("flatType") String flatType,
            @RequestParam("location") String location,
            @RequestParam("amenities") String amenities,
            @RequestParam("rent") Float rent,
            @RequestParam("cityid") Long cityid,
            @RequestParam("capacity") Integer capacity,
            @RequestParam("userid") Integer userid,
            @RequestParam("images") MultipartFile[] images
    ) {
        try {
            PropertyRequest request = new PropertyRequest();
            request.setFlatType(flatType);
            request.setLocation(location);
            request.setAmenities(amenities);
            request.setRent(rent);
            request.setCityid(cityid != null ? cityid.intValue() : null);
            request.setCapacity(capacity);
            request.setUserid(userid);
            request.setImages(Arrays.asList(images));

            Property saved = propertyService.createProperty(request);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Failed to create property: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<PropertyResponse>> getAllProperties() {
        List<PropertyResponse> responses = propertyService.getAllPropertyResponses();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/available")
    public ResponseEntity<List<PropertyResponse>> getAvailableProperties() {
        List<Property> properties = propertyService.getPropertiesByStatus(1);
        List<PropertyResponse> responses = properties.stream().map(property -> PropertyResponse.builder()
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
                .preferences(property.getPreferences().stream()
                        .filter(p -> Boolean.TRUE.equals(p.getFitness()) || Boolean.TRUE.equals(p.getNightowl()) ||
                                Boolean.TRUE.equals(p.getSmoker()) || Boolean.TRUE.equals(p.getNonalcoholic()) ||
                                Boolean.TRUE.equals(p.getVegetarian()))
                        .map(p -> {
                            if (Boolean.TRUE.equals(p.getFitness())) return "fitness";
                            if (Boolean.TRUE.equals(p.getNightowl())) return "nightowl";
                            if (Boolean.TRUE.equals(p.getSmoker())) return "smoker";
                            if (Boolean.TRUE.equals(p.getNonalcoholic())) return "nonalcoholic";
                            if (Boolean.TRUE.equals(p.getVegetarian())) return "vegetarian";
                            return null;
                        })
                        .filter(p -> p != null)
                        .collect(Collectors.toList()))
                .build()).collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{propertyid}")
    public ResponseEntity<PropertyResponse> getPropertyById(@PathVariable Integer propertyid) {
        PropertyResponse response = propertyService.getPropertyById(propertyid)
                .orElseThrow(() -> new RuntimeException("Property not found with id: " + propertyid));

        // add interested tenant count
        Long interestedTenantCount = interestedTenantService.getInterestedTenantCount(propertyid);
        response.setInterestedTenantCount(interestedTenantCount);

        // add preferences (convert boolean flags to strings)
        if (response.getPreferences() == null && response.getPropertyid() != null) {
            propertyService.getPropertyById(propertyid).ifPresent(prop -> {
                List<String> prefs = prop.getPreferences();
                response.setPreferences(prefs);
            });
        }

        return ResponseEntity.ok(response);
    }


    @GetMapping("/owner/{userId}")
    public ResponseEntity<List<PropertyResponse>> getPropertiesByUser(@PathVariable("userId") Integer userid) {
        List<PropertyResponse> properties = propertyService.getPropertiesByUser(userid);
        return ResponseEntity.ok(properties);
    }

    @DeleteMapping("/delete/{propertyId}")
    public ResponseEntity<String> deleteProperty(@PathVariable Integer propertyId) {
        boolean deleted = propertyService.deleteProperty(propertyId);
        if (deleted) {
            return ResponseEntity.ok("Property deleted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Property not found");
        }
    }

    @PostMapping("/interested")
    public ResponseEntity<String> showInterest(@RequestBody InterestRequest request) {
        try {
            if (request.getUserid() == null || request.getPropid() == null) {
                return ResponseEntity.badRequest()
                        .body("User ID and Property ID are required");
            }

            boolean success = propertyService.showInterest(
                    request.getUserid(),
                    request.getPropid()
            );

            if (success) {
                return ResponseEntity.ok("Interest registered successfully");
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("You have already shown interest in this property");
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to register interest: " + e.getMessage());
        }
    }

    @GetMapping("/interested-users/{propertyId}")
    public ResponseEntity<?> getInterestedUsers(@PathVariable Integer propertyId) {
        List<InterestedUserResponse> users = interestedTenantService.getInterestedUsers(propertyId);
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{propertyId}/grant")
    public ResponseEntity<String> grantProperty(@PathVariable Integer propertyId) {
        boolean updated = propertyService.grantProperty(propertyId);
        if (updated) {
            return ResponseEntity.ok("Property granted successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Property not found or already granted");
        }
    }



    @PutMapping("/{propertyId}/release")
    public ResponseEntity<String> releaseProperty(@PathVariable Integer propertyId) {
        boolean updated = propertyService.releaseProperty(propertyId);
        if (updated) {
            return ResponseEntity.ok("Property released successfully (status changed to 1)");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Property not found or already available");
        }
    }

    @GetMapping("/tenants/{userId}")
    public ResponseEntity<List<PropertyResponse>> getPropertiesByTenant(@PathVariable int userId) {
        String sql = "SELECT p.* FROM property p " +
                "JOIN user u ON p.userid = u.userid " +
                "WHERE u.roleid = 2 AND u.userid = ?";

        List<PropertyResponse> response = jdbcTemplate.query(sql, new Object[]{userId}, (rs, rowNum) ->
                PropertyResponse.builder()
                        .propertyid(rs.getInt("propertyid"))
                        .capacity(rs.getInt("capacity"))
                        .userid(rs.getInt("userid"))
                        .flatType(rs.getString("flatType"))
                        .location(rs.getString("location"))
                        .amenities(rs.getString("amenities"))
                        .rent(rs.getFloat("rent"))
                        .status(rs.getInt("status"))
                        .cityid(rs.getInt("cityid"))
                        .photoUrls(rs.getString("photos") != null && !rs.getString("photos").isEmpty()
                                ? List.of(rs.getString("photos").split(","))
                                : List.of())
                        .preferences(List.of())
                        .interestedTenantCount(0L)
                        .build()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/owner/{userId}/has-listed")
    public ResponseEntity<Boolean> hasListedProperty(@PathVariable Integer userId) {
        String sql = "SELECT COUNT(*) FROM property WHERE userid = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId);
        return ResponseEntity.ok(count != null && count > 0);
    }


//    @GetMapping("/tenants")
//    public ResponseEntity<List<PropertyResponse>> getPropertiesByTenants() {
//        String sql = "SELECT p.* FROM property p " +
//                "JOIN users u ON p.userid = u.userid " +
//                "WHERE u.roleid = 2";
//
//        List<Property> properties = jdbcTemplate.query(sql, (rs, rowNum) -> {
//            Property property = new Property();
//            property.setPropertyid(rs.getInt("propertyid"));
//            property.setCapacity(rs.getInt("capacity"));
//            property.setRent(rs.getFloat("rent"));
//            property.setFlattype(rs.getString("flattype"));
//            property.setLocation(rs.getString("location"));
//            property.setAmenities(rs.getString("amenities"));
//            property.setStatus(rs.getInt("status"));
//            property.setUserid(rs.getInt("userid"));
//            // Map city only if you have a constructor or setter for City entity
//            // property.setCity(new City(rs.getInt("cityid")));
//            return property;
//        });
//
//        List<PropertyResponse> responses = properties.stream().map(property -> PropertyResponse.builder()
//                .propertyid(property.getPropertyid())
//                .capacity(property.getCapacity())
//                .userid(property.getUserid())
//                .flatType(property.getFlattype())
//                .location(property.getLocation())
//                .amenities(property.getAmenities())
//                .rent(property.getRent())
//                .status(property.getStatus())
//                .cityid(property.getCity() != null ? property.getCity().getCityid() : null)
//                .photoUrls(property.getPhotoList())
//                .preferences(property.getPreferences().stream()
//                        .filter(p -> Boolean.TRUE.equals(p.getFitness()) || Boolean.TRUE.equals(p.getNightowl()) ||
//                                Boolean.TRUE.equals(p.getSmoker()) || Boolean.TRUE.equals(p.getNonalcoholic()) ||
//                                Boolean.TRUE.equals(p.getVegetarian()))
//                        .map(p -> {
//                            if (Boolean.TRUE.equals(p.getFitness())) return "fitness";
//                            if (Boolean.TRUE.equals(p.getNightowl())) return "nightowl";
//                            if (Boolean.TRUE.equals(p.getSmoker())) return "smoker";
//                            if (Boolean.TRUE.equals(p.getNonalcoholic())) return "nonalcoholic";
//                            if (Boolean.TRUE.equals(p.getVegetarian())) return "vegetarian";
//                            return null;
//                        })
//                        .filter(p -> p != null)
//                        .collect(Collectors.toList()))
//                .build()
//        ).collect(Collectors.toList());
//
//        return ResponseEntity.ok(responses);
//    }

}
