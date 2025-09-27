package com.flatbuddy.backend.repository;

import com.flatbuddy.backend.entity.Preference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferenceRepository extends JpaRepository<Preference, Integer> {
}