package com.apartments.reservation.repository;

import com.apartments.apartment.model.*;
import com.apartments.reservation.model.Reservation;
import com.apartments.reservation.util.ReservationStatusEnum;
import com.apartments.user.appuser.model.*;
import com.apartments.user.guest.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByGuest(AppUser appUser);
    List<Reservation> findAllByApartment(Apartment apartment);
    List<Reservation> findAllByReservationStatus(ReservationStatusEnum statusEnum);

}
