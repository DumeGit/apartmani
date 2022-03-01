package com.apartments.reservation.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.*;
import java.util.Date;

@Getter
@Setter
public class ReservationCreateDto {
    private LocalDate dateTo;
    private LocalDate dateFrom;
    private Long apartmentId;

}
