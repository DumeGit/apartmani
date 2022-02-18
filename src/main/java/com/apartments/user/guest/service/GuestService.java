package com.apartments.user.guest.service;

import com.apartments.user.guest.dto.*;
import com.apartments.user.guest.model.*;
import com.apartments.user.guest.repository.*;
import com.apartments.util.mapper.*;
import lombok.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GuestService {

    private final ModelMapperConfig modelMapperConfig;
    private final GuestRepository guestRepository;

    public void create(GuestRegisterDto dto) {
        guestRepository.save(modelMapperConfig.modelMapper().map(dto, Guest.class));
    }
}
