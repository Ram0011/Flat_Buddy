package com.flatbuddy.backend.repository;

import com.flatbuddy.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Find by uname (mapped to DB column "uname")
    Optional<User> findByUname(String uname);

    // If you also need email-based login
    Optional<User> findByEmailid(String emailid);

    // To check if username already exists
    boolean existsByUname(String uname);

    // To check if email already exists
    boolean existsByEmailid(String emailid);
}
