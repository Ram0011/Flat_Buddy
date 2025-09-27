package com.flatbuddy.backend.repository;

import com.flatbuddy.backend.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Integer> {
    List<Property> findByUserid(Integer userid);
    List<Property> findByStatus(int status);


}