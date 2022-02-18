package com.apartments.user.guest.controller;

import com.apartments.user.guest.dto.*;
import com.apartments.user.guest.service.*;
import lombok.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/guest")
public class GuestController {
    private final GuestService guestService;

    public @ResponseBody String create(@RequestBody GuestRegisterDto dto) {
        guestService.create(dto);
        return "You have registered";
    }
}
