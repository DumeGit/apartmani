package com.apartments.apartment.model;

import com.apartments.reservation.model.Reservation;
import com.apartments.review.model.Review;
import com.apartments.user.appadmin.model.AppAdmin;
import com.apartments.utility.model.Utility;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String address;

    private Float averageRating;

    private Integer dailyCost;

    private String description;

    @ManyToMany
    @JoinTable(name = "APARTMENT_UTILITIES")
    private List<Utility> utilityList;

    @OneToMany(mappedBy = "apartment")
    private List<Reservation> reservationList;

    @OneToMany(mappedBy = "apartment")
    private List<Review> reviewList;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private AppAdmin owner;

}
