package com.apartments.utility.repository;

import com.apartments.review.model.Review;
import com.apartments.utility.model.Utility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilityRepository extends JpaRepository<Utility, Long> {
}
