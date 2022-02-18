package com.apartments.util.mapper;

import org.modelmapper.*;
import org.springframework.context.annotation.*;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

}
