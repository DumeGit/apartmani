package com.apartments;


import com.apartments.apartment.model.*;
import com.apartments.apartment.repository.*;
import com.apartments.reservation.model.*;
import com.apartments.reservation.repository.*;
import com.apartments.reservation.util.*;
import com.apartments.security.*;
import com.apartments.user.appadmin.model.*;
import com.apartments.user.appadmin.repository.*;
import com.apartments.user.guest.model.*;
import com.apartments.user.guest.repository.*;
import lombok.*;
import org.apache.tomcat.jni.*;
import org.springframework.boot.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

import java.time.LocalDate;
import java.util.*;

@Component
@RequiredArgsConstructor
public class InitMockData implements ApplicationRunner {
    private final AppAdminRepository appAdminRepository;
    private final GuestRepository guestRepository;
    private final ApartmentRepository apartmentRepository;
    private final ReservationRepository reservationRepository;

    private static final String HASH = "$2a$10$BwIMdwLtcRBQd96aMSgiEu2v9P6ynM6TM7SpEV3cfmvYYZ5srYXla";

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        addUsers();
        addApartments();
        addReservations();
    }

    @Transactional
    void addUsers() {
        AppAdmin appAdmin = new AppAdmin("nino@gmail.com", HASH);
        appAdminRepository.save(appAdmin);

        Guest guest = new Guest();
        guest.setEmail("guest@gmail.com");
        guest.setPassword(HASH);
        guest.setFirstName("Pero");
        guest.setLastName("Peric");
        guest.setRole(AppRole.GUEST);
        guestRepository.save(guest);

        Guest guest1 = new Guest();
        guest1.setEmail("guest1@gmail.com");
        guest1.setPassword(HASH);
        guest1.setFirstName("Nino");
        guest1.setLastName("Ninic");
        guest1.setRole(AppRole.GUEST);
        guestRepository.save(guest1);

        Guest guest2 = new Guest();
        guest2.setEmail("guest2@gmail.com");
        guest2.setPassword(HASH);
        guest2.setFirstName("Tihana");
        guest2.setLastName("Tihanic");
        guest2.setRole(AppRole.GUEST);
        guestRepository.save(guest2);

    }

    @Transactional
    void addApartments() {
        AppAdmin appAdmin = appAdminRepository.findById(1L).get();
        Apartment apartment = new Apartment();
        apartment.setAddress("Palit 267a");
        apartment.setAverageRating(0F);
        apartment.setDescription("Predobro");
        apartment.setDailyCost(50);
        apartment.setName("Linda");
        apartment.setOwner(appAdmin);

        Apartment apartment1 = new Apartment();
        apartment1.setAddress("Palit 266a");
        apartment1.setAverageRating(0F);
        apartment1.setDescription("Lijepo");
        apartment1.setDailyCost(70);
        apartment1.setName("Nino");
        apartment1.setOwner(appAdmin);

        Apartment apartment2 = new Apartment();
        apartment2.setAddress("Palit 265a");
        apartment2.setAverageRating(0F);
        apartment2.setDescription("Divno");
        apartment2.setDailyCost(60);
        apartment2.setName("Luka");
        apartment2.setOwner(appAdmin);
        apartmentRepository.save(apartment);
        apartmentRepository.save(apartment1);
        apartmentRepository.save(apartment2);

    }

    @Transactional
    void addReservations() {
        Guest guest1 = guestRepository.findById(2L).get();
        Guest guest2 = guestRepository.findById(3L).get();
        Apartment apartment1 = apartmentRepository.findById(1L).get();
        Apartment apartment2 = apartmentRepository.findById(2L).get();

        Reservation reservation = new Reservation();
        reservation.setReservationStatus(ReservationStatusEnum.REQUESTED);
        reservation.setGuest(guest1);
        reservation.setApartment(apartment1);
        LocalDate from = LocalDate.now();
        LocalDate to = from.plusDays(7);
        reservation.setPeriodFrom(from);
        reservation.setPeriodTo(to);
        reservationRepository.save(reservation);

        Reservation reservation1 = new Reservation();
        reservation1.setReservationStatus(ReservationStatusEnum.ACCEPTED);
        reservation1.setGuest(guest2);
        reservation1.setApartment(apartment2);
        reservation1.setPeriodFrom(from);
        reservation1.setPeriodTo(to);
        reservationRepository.save(reservation1);
    }
}
