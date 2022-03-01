package com.apartments.apartment.controller;

import com.apartments.apartment.dto.*;
import com.apartments.apartment.service.*;
import lombok.*;
import org.springframework.security.access.annotation.*;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path = "/apartment")
@RequiredArgsConstructor
public class ApartmentController {
    private final ApartmentService apartmentService;

    @GetMapping("/search")
    public List<ApartmentSearchDto> search(){
        return apartmentService.search();
    }

    @Secured("ROLE_GUEST")
    @PostMapping("/getOne")
    public ApartmentSearchWithDatesDto getOne(@RequestBody ApartmentGetOneDto dto) {
        return apartmentService.getOne(dto.getId());
    }
}
