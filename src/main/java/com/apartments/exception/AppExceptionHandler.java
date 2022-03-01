package com.apartments.exception;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class AppExceptionHandler extends ResponseEntityExceptionHandler {
    private static final Logger LOG = LoggerFactory.getLogger(AppExceptionHandler.class);


    @ExceptionHandler(Exception.class)
    protected ResponseEntity genericHandleException(Exception ex, WebRequest request) {
        Map<String, List<ErrorDto>> body = new HashMap<>();
        String title = "Error";
        String message = ex.getMessage();
        body.put("errors", Collections.singletonList(new ErrorDto(title, message)));
        LOG.info("EXCEPTION OCCURRED: " + ex.getClass().getName());
        ex.printStackTrace();
        return handleExceptionInternal(ex, body, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    @ExceptionHandler(AppException.class)
    protected ResponseEntity handleConflict(AppException exception, WebRequest request) {
        String message = exception.getCode();
        String title = exception.getType();
        Map<String, List<ErrorDto>> body = new HashMap<>();
        body.put("errors", Collections.singletonList(new ErrorDto(title, message)));
        return handleExceptionInternal(exception, body, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(BadCredentialsException.class)
    protected ResponseEntity handleInvalidLoginException(BadCredentialsException ex, WebRequest request) {
        String title = "Login";
        String message = ex.getMessage();
        Map<String, List<ErrorDto>> body = new HashMap<>();
        body.put("errors", Collections.singletonList(new ErrorDto(title, message)));
        return handleExceptionInternal(ex, body, new HttpHeaders(), HttpStatus.UNAUTHORIZED, request);
    }

    @ExceptionHandler(AccessDeniedException.class)
    protected ResponseEntity handleForbiddenException(AccessDeniedException ex, WebRequest request) {
        String title = "Forbiden error";
        String message = ex.getMessage();
        Map<String, List<ErrorDto>> body = new HashMap<>();
        body.put("errors", Collections.singletonList(new ErrorDto(title, message)));
        return handleExceptionInternal(ex, body, new HttpHeaders(), HttpStatus.FORBIDDEN, request);
    }



    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {
        Map<String, List<ErrorDto>> body = new HashMap<>();
        List<ErrorDto> errors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String titleCode = ((FieldError) error).getField();
            String title = "nevalidni";
            String message = error.getDefaultMessage();
            errors.add(new ErrorDto(title, message));
        });
        body.put("errors", errors);
        return ResponseEntity.badRequest().body(body);
    }
}
