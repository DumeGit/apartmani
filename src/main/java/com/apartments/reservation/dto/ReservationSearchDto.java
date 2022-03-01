package com.apartments.reservation.dto;

import com.apartments.reservation.util.*;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.*;
import java.util.Date;

@Getter
@Setter
public class ReservationSearchDto {
    private Long id;
    private LocalDate periodFrom;
    private LocalDate periodTo;
    private String guestFirstName;
    private String guestLastName;
    private String apartmentName;
    @Enumerated
    private ReservationStatusEnum reservationStatus;
}
