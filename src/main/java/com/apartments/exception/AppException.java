package com.apartments.exception;

public class AppException extends RuntimeException {

    private String code;
    private String type;

    public AppException(String code, String type) {
        super();
        this.code = code;
        this.type = type;
    }

    public String getCode() {
        return this.code;
    }

    public String getType() {
        return this.type;
    }

}