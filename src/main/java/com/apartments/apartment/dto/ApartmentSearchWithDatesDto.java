package com.apartments.apartment.dto;

import lombok.*;

import java.time.*;
import java.util.*;

@Getter
@Setter
public class ApartmentSearchWithDatesDto {
    private Long id;

    private String name;

    private String address;

    private Float averageRating;

    private Integer dailyCost;

    private String description;

    private List<LocalDate> disabledDates;
}
