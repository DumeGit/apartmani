package com.apartments.user.appuser.dto;

import com.apartments.security.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppUserDto {
    private String email;
    private AppRole role;

}
