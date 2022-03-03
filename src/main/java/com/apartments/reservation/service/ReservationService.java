package com.apartments.reservation.service;

import com.apartments.apartment.model.*;
import com.apartments.apartment.repository.ApartmentRepository;
import com.apartments.apartment.service.*;
import com.apartments.exception.*;
import com.apartments.reservation.dto.ReservationCreateDto;
import com.apartments.reservation.dto.ReservationSearchDto;
import com.apartments.reservation.model.Reservation;
import com.apartments.reservation.repository.ReservationRepository;
import com.apartments.reservation.util.ReservationStatusEnum;
import com.apartments.user.appuser.model.*;
import com.apartments.user.appuser.repository.*;
import com.apartments.user.guest.repository.GuestRepository;
import com.apartments.util.mapper.*;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.time.temporal.*;
import java.util.*;
import java.util.stream.*;


@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ApartmentRepository apartmentRepository;
    private final GuestRepository guestRepository;
    private final ReservationRepository reservationRepository;
    private final AppUserRepository appUserRepository;
    private final ModelMapperConfig modelMapperConfig;
    private final ApartmentService apartmentService;

    @Transactional
    public void create(ReservationCreateDto dto, String email) {
        LocalDate dateFrom = dto.getDateFrom().plusDays(1);
        LocalDate dateTo = dto.getDateTo().plusDays(1);
        Reservation reservation = new Reservation(dateFrom, dateTo, guestRepository.getByEmail(email), apartmentRepository.findById(dto.getApartmentId()).get(), ReservationStatusEnum.REQUESTED);

        long numOfDays = ChronoUnit.DAYS.between(dateFrom, dateTo);
        List<LocalDate> daysRange = Stream.iterate(dateFrom, date -> date.plusDays(1)).limit(numOfDays+1).collect(Collectors.toList());

        List<LocalDate> bookedDates = new ArrayList<>(daysRange);
        List<LocalDate> disabledDates = apartmentService.getAllReservedDates(apartmentRepository.findById(dto.getApartmentId()).get());

        if(!Collections.disjoint(bookedDates, disabledDates)) {
            throw new AppException("Selected dates are already booked", "reservation");
        }

        reservationRepository.save(reservation);
    }

    public List<ReservationSearchDto> search(String username) {

        AppUser appUser = appUserRepository.findByEmail(username).orElseThrow();
        List<Reservation> reservationList = reservationRepository.findAllByGuest(appUser);

        return reservationList.stream()
                .map(element -> modelMapperConfig.modelMapper().map(element, ReservationSearchDto.class))
                .collect(Collectors.toList());

    }

    public List<ReservationSearchDto> search(Long apartmentId) {

        Apartment apartment = apartmentRepository.findById(apartmentId).orElseThrow();
        List<Reservation> reservationList = reservationRepository.findAllByApartment(apartment);

        return reservationList.stream()
                .map(element -> modelMapperConfig.modelMapper().map(element, ReservationSearchDto.class))
                .collect(Collectors.toList());

    }

    public List<ReservationSearchDto> searchByAdmin() {

        List<Reservation> reservationList = reservationRepository.findAllByReservationStatus(ReservationStatusEnum.REQUESTED);

        return reservationList.stream()
                .map(element -> modelMapperConfig.modelMapper().map(element, ReservationSearchDto.class))
                .collect(Collectors.toList());

    }

    public List<ReservationSearchDto> searchAccepted() {

        List<Reservation> reservationList = reservationRepository.findAllByReservationStatus(ReservationStatusEnum.ACCEPTED);

        return reservationList.stream()
                .map(element -> modelMapperConfig.modelMapper().map(element, ReservationSearchDto.class))
                .collect(Collectors.toList());

    }

    public void accept(Long id) {
        Reservation reservation = reservationRepository.findById(id).get();
        reservation.setReservationStatus(ReservationStatusEnum.ACCEPTED);
        reservationRepository.save(reservation);
    }

    public void deny(Long id) {
        reservationRepository.deleteById(id);
    }
}
