package com.apartments;


import com.apartments.apartment.model.*;
import com.apartments.apartment.repository.*;
import com.apartments.reservation.model.*;
import com.apartments.reservation.repository.*;
import com.apartments.reservation.util.*;
import com.apartments.user.appadmin.model.*;
import com.apartments.user.appadmin.repository.*;
import com.apartments.user.guest.model.*;
import com.apartments.user.guest.repository.*;
import lombok.*;
import org.springframework.boot.*;
import org.springframework.stereotype.*;
import org.springframework.transaction.annotation.*;

import java.util.*;

@Component
@RequiredArgsConstructor
public class InitMockData implements ApplicationRunner {
    private final AppAdminRepository appAdminRepository;
    private final GuestRepository guestRepository;
    private final ApartmentRepository apartmentRepository;
    private final ReservationRepository reservationRepository;

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        addUsers();
        addApartments();
        addReservations();
    }

    @Transactional
    void addUsers() {
        AppAdmin appAdmin = new AppAdmin();
        appAdmin.setEmail("nino@gmail.com");
        appAdmin.setPassword("kurac");
        appAdmin.setUsername("dumke");
        appAdminRepository.save(appAdmin);

        Guest guest = new Guest();
        guest.setEmail("guest@gmail.com");
        guest.setPassword("penis");
        guest.setFirstName("Pero");
        guest.setLastName("Peric");
        guest.setUsername("guest");
        guestRepository.save(guest);

        Guest guest1 = new Guest();
        guest1.setEmail("guest1@gmail.com");
        guest1.setPassword("penis");
        guest1.setFirstName("Nino");
        guest1.setLastName("Ninic");
        guest1.setUsername("niny");
        guestRepository.save(guest1);

        Guest guest2 = new Guest();
        guest2.setEmail("guest2@gmail.com");
        guest2.setPassword("penis");
        guest2.setFirstName("Tihana");
        guest2.setLastName("Tihanic");
        guest2.setUsername("tihy");
        guestRepository.save(guest2);

    }

    @Transactional
    void addApartments() {
        AppAdmin appAdmin = appAdminRepository.getById(1L);
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
        Guest guest1 = guestRepository.getById(2L);
        Guest guest2 = guestRepository.getById(3L);
        Apartment apartment1 = apartmentRepository.getById(1L);
        Apartment apartment2 = apartmentRepository.getById(2L);

        Reservation reservation = new Reservation();
        reservation.setReservationStatus(ReservationStatusEnum.REQUESTED);
        reservation.setGuest(guest1);
        reservation.setApartment(apartment1);
        Date from = new Date();
        Date to = new Date();
        to.setTime(from.getTime() + 100L);
        reservation.setPeriodFrom(from);
        reservation.setPeriodFrom(to);
        reservationRepository.save(reservation);

        Reservation reservation1 = new Reservation();
        reservation1.setReservationStatus(ReservationStatusEnum.ACCEPTED);
        reservation1.setGuest(guest2);
        reservation1.setApartment(apartment2);
        to.setTime(from.getTime() + 100L);
        reservation1.setPeriodFrom(from);
        reservation1.setPeriodFrom(to);
        reservationRepository.save(reservation1);
    }
}
