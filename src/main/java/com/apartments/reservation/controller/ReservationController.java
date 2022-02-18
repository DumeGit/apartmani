package com.apartments.reservation.controller;

import com.apartments.reservation.dto.*;
import com.apartments.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/reservation")
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping(path = "/create")
    public @ResponseBody
    String create(@RequestBody ReservationCreateDto dto) {
        reservationService.create(dto);
        return "Great success";
    }

    @PostMapping("/search")
    public @ResponseBody
    List<ReservationSearchDto> search(Authentication authentication) {
        return reservationService.search(authentication.getName());
    }

    @PostMapping(path = "/accept")
    public @ResponseBody String accept(@RequestBody ReservationAcceptDto dto, Authentication authentication) {
        reservationService.accept(dto.getReservationId());
        return "Accepted";
    }
}
