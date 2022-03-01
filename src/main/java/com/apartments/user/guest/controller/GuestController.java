package com.apartments.user.guest.controller;

import com.apartments.user.guest.dto.*;
import com.apartments.user.guest.service.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/guest")
public class GuestController {
    private final GuestService guestService;

    @PostMapping("/register")
    public ResponseEntity<?> create(@RequestBody @Valid GuestRegisterDto dto) {
        guestService.create(dto);
        return ResponseEntity.ok().build();
    }
}
