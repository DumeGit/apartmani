package com.apartments.user.appadmin.repository;

import com.apartments.user.appadmin.model.AppAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppAdminRepository extends JpaRepository<AppAdmin, Long> {
}
