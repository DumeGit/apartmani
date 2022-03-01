package com.apartments.apartment.service;

import com.apartments.apartment.dto.*;
import com.apartments.apartment.model.*;
import com.apartments.apartment.repository.*;
import com.apartments.reservation.model.*;
import com.apartments.util.mapper.*;
import lombok.*;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.temporal.*;
import java.util.*;
import java.util.stream.*;

@Service
@RequiredArgsConstructor
public class ApartmentService {
    private final ApartmentRepository apartmentRepository;
    private final ModelMapperConfig modelMapperConfig;

    public List<ApartmentSearchDto> search(){
        return apartmentRepository.findAll().stream().map(element -> modelMapperConfig.modelMapper().map(element, ApartmentSearchDto.class)).collect(Collectors.toList());
    }

    public ApartmentSearchWithDatesDto getOne(Long id) {
        Apartment apartment = apartmentRepository.getOne(id);

        ApartmentSearchWithDatesDto dto = modelMapperConfig.modelMapper().map(apartment, ApartmentSearchWithDatesDto.class);
        dto.setDisabledDates(getAllReservedDates(apartment));

        return dto;
    }

    public List<LocalDate> getAllReservedDates(Apartment apartment) {
        List<LocalDate> periodFromList = apartment.getReservationList().stream().map(Reservation::getPeriodFrom).collect(Collectors.toList());
        List<LocalDate> periodToList = apartment.getReservationList().stream().map(Reservation::getPeriodTo).collect(Collectors.toList());
        List<LocalDate> disabledDates = new ArrayList<>();

        for (int i = 0; i < periodFromList.size(); i ++) {
            long numOfDays = ChronoUnit.DAYS.between(periodFromList.get(i), periodToList.get(i));
            List<LocalDate> daysRange = Stream.iterate(periodFromList.get(i), date -> date.plusDays(1)).limit(numOfDays+1).collect(Collectors.toList());
            disabledDates.addAll(daysRange);
        }

        return disabledDates;
    }
}
