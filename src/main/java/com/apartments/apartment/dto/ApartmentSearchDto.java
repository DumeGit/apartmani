package com.apartments.apartment.dto;

import lombok.*;

@Getter
@Setter
public class ApartmentSearchDto {
    private Long id;

    private String name;

    private String address;

    private Float averageRating;

    private Integer dailyCost;

    private String description;
}
