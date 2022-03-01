package com.apartments.user.guest.dto;

import lombok.*;

@Getter
@Setter
public class GuestRegisterDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String confirmPassword;
}
