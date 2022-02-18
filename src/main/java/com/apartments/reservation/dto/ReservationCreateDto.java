package com.apartments.reservation.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ReservationCreateDto {
    private Date periodFrom;
    private Date periodTo;
    private Long apartmentId;
    private Long guestId;

}
