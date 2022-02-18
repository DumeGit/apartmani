package com.apartments.reservation.service;

import com.apartments.apartment.repository.ApartmentRepository;
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

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ApartmentRepository apartmentRepository;
    private final GuestRepository guestRepository;
    private final ReservationRepository reservationRepository;
    private final AppUserRepository appUserRepository;
    private final ModelMapperConfig modelMapperConfig;

    @Transactional
    public void create(ReservationCreateDto dto) {
        Reservation reservation = new Reservation(dto.getPeriodFrom(), dto.getPeriodTo(), guestRepository.getById(dto.getGuestId()), apartmentRepository.getById(dto.getApartmentId()), ReservationStatusEnum.REQUESTED);

        reservationRepository.save(reservation);
    }

    public List<ReservationSearchDto> search(String username) {

        AppUser appUser = appUserRepository.findByUsername(username);
        List<Reservation> reservationList = reservationRepository.findAllById(appUser.getId());

        return reservationList.stream()
                .map(element -> modelMapperConfig.modelMapper().map(element, ReservationSearchDto.class))
                .collect(Collectors.toList());

    }

    public void accept(Long id) {
        Reservation reservation = reservationRepository.getById(id);
        reservation.setReservationStatus(ReservationStatusEnum.ACCEPTED);
        reservationRepository.save(reservation);
    }
}
