package com.apartments.user.appuser.model;

import com.apartments.security.*;
import lombok.*;
import org.hibernate.validator.constraints.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor()
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@ToString(exclude = {"password"})
@EqualsAndHashCode(exclude = {"password"})
public abstract class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String password;

    @NotNull
    @Column(unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private AppRole role;

    public AppUser (String email, String password, AppRole role){
        this.password = password;
        this.email = email;
        this.role = role;
    }


}
