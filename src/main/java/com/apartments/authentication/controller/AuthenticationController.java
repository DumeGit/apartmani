package com.apartments.authentication.controller;

import com.apartments.authentication.dto.*;
import com.apartments.authentication.service.*;
import com.apartments.user.appuser.dto.*;
import lombok.*;
import org.springframework.http.*;
import org.springframework.security.core.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @GetMapping("/user")
    public ResponseEntity<AppUserDto> getCurrentUser(Authentication authentication) {

        return ResponseEntity.ok(authenticationService.getCurrentUser(authentication.getName()));
    }

    @PostMapping("/guest")
    public ResponseEntity<?> guestLogin(@RequestParam String email, @RequestParam String password) {
        authenticationService.guestLogin(email, password);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/admin")
    public ResponseEntity<?> adminLogin(@RequestParam String email, @RequestParam String password) {
        authenticationService.adminLogin(email, password);
        return ResponseEntity.ok().build();
    }

}
