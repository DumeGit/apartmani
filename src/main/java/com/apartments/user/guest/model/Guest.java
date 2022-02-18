package com.apartments.user.guest.model;

import com.apartments.reservation.model.Reservation;
import com.apartments.review.model.Review;
import com.apartments.user.appuser.model.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Guest extends AppUser {

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    @OneToMany(mappedBy = "guest")
    private List<Reservation> reservationList;

    @OneToMany(mappedBy = "guest")
    private List<Review> reviewList;

    public Guest(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
