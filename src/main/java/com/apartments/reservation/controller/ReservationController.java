package com.apartments.reservation.controller;

import com.apartments.reservation.dto.*;
import com.apartments.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.annotation.*;
import org.springframework.security.core.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/reservation")
@RequiredArgsConstructor
@CrossOrigin
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping(path = "/create")
    public @ResponseBody
    String create(@RequestBody ReservationCreateDto dto, Authentication authentication) {
        reservationService.create(dto, authentication.getName());
        return "Great success";
    }

    @GetMapping("/searchByGuest")
    public @ResponseBody
    List<ReservationSearchDto> search(Authentication authentication) {
        return reservationService.search(authentication.getName());
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/search")
    public @ResponseBody
    List<ReservationSearchDto> searchByAdmin(Authentication authentication) {
        return reservationService.searchByAdmin();
    }

    @PostMapping("/searchByApartment")
    public @ResponseBody
    List<ReservationSearchDto> search(@RequestBody Long id) {
        return reservationService.search(id);
    }

    @PostMapping(path = "/accept")
    public ResponseEntity<?> accept(@RequestBody ReservationAcceptDto dto) {
        reservationService.accept(dto.getReservationId());
        return ResponseEntity.ok().build();
    }

    @PostMapping(path = "/deny")
    public ResponseEntity<?> deny(@RequestBody ReservationAcceptDto dto) {
        reservationService.deny(dto.getReservationId());
        return ResponseEntity.ok().build();
    }

}
