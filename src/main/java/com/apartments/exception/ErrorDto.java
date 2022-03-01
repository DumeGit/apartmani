package com.apartments.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ErrorDto {
    private String type;
    private String message;

    public ErrorDto(String type, String message) {
        this.type = type;
        this.message = message;
    }

}
