package com.apartments.user.guest.service;

import com.apartments.exception.*;
import com.apartments.security.*;
import com.apartments.user.guest.dto.*;
import com.apartments.user.guest.model.*;
import com.apartments.user.guest.repository.*;
import com.apartments.util.mapper.*;
import lombok.*;
import org.springframework.security.crypto.password.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GuestService {

    private final ModelMapperConfig modelMapperConfig;
    private final GuestRepository guestRepository;
    private final PasswordEncoder passwordEncoder;

    public void create(GuestRegisterDto dto) {
        Guest guest = modelMapperConfig.modelMapper().map(dto, Guest.class);
        guest.setRole(AppRole.GUEST);
        guest.setPassword(passwordEncoder.encode(dto.getPassword()));
        try {
            guestRepository.save(guest);
        } catch (Exception e){
            throw new AppException("error", "E-mail already used");
        }

    }
}
