package com.apartments.reservation.model;

import com.apartments.apartment.model.Apartment;
import com.apartments.reservation.util.ReservationStatusEnum;
import com.apartments.user.guest.model.Guest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.*;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate periodFrom;

    private LocalDate periodTo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "guest_id")
    private Guest guest;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "apartment_id")
    private Apartment apartment;

    @Enumerated
    ReservationStatusEnum reservationStatus;

    public Reservation(LocalDate periodFrom, LocalDate periodTo, Guest guest, Apartment apartment, ReservationStatusEnum reservationStatus) {
        this.periodFrom = periodFrom;
        this.periodTo = periodTo;
        this.guest = guest;
        this.apartment = apartment;
        this.reservationStatus = reservationStatus;
    }
}
