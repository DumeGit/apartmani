package com.apartments.user.appadmin.model;

import com.apartments.apartment.model.Apartment;
import com.apartments.security.*;
import com.apartments.user.appuser.model.AppUser;
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
public class AppAdmin extends AppUser {

    @OneToMany(mappedBy = "owner")
    private List<Apartment> apartmentList;

    public AppAdmin(String email, String password) {
        super(email, password, AppRole.ADMIN);
    }
}
