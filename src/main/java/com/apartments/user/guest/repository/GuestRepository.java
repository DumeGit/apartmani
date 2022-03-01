package com.apartments.user.guest.repository;

import com.apartments.user.guest.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {
    Guest getByEmail(String email);
}
