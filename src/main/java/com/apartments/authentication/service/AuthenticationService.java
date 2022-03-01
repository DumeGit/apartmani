package com.apartments.authentication.service;

import com.apartments.security.*;
import com.apartments.user.appadmin.model.*;
import com.apartments.user.appadmin.repository.*;
import com.apartments.user.appuser.dto.*;
import com.apartments.user.appuser.repository.*;
import com.apartments.user.guest.model.*;
import com.apartments.user.guest.repository.*;
import lombok.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.security.core.authority.*;
import org.springframework.security.core.context.*;
import org.springframework.security.crypto.password.*;
import org.springframework.stereotype.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AppUserDetailsService detailsService;
    private final GuestRepository guestRepository;
    private final AppAdminRepository appAdminRepository;
    private final AuthenticationManager authenticationManager;
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    public AppUserDto getCurrentUser(String username) {
        AppUserDetails userDetails = (AppUserDetails) detailsService.loadUserByUsername(username);
        if (userDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_GUEST"))) {
            Guest guest = guestRepository.getByEmail(userDetails.getUsername());
            return new AppUserDto(guest.getEmail(), AppRole.GUEST);
        } else {
            AppAdmin admin = appAdminRepository.getByEmail(userDetails.getUsername());
            return new AppUserDto(admin.getEmail(), AppRole.ADMIN);
        }
    }

    public void guestLogin(String username, String password) {
        AppUserDetails user = getUser(username, password);
        if(!user.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_GUEST"))) {
            throw new BadCredentialsException("Wrong credentials");
        }
        authenticateUser(username, password);
    }

    public void adminLogin(String username, String password) {
        AppUserDetails user = getUser(username, password);
        if(!user.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            throw new BadCredentialsException("Wrong credentials");
        }
        authenticateUser(username, password);
    }

    private AppUserDetails getUser(String username, String password) {
        AppUserDetails user = new AppUserDetails(appUserRepository.findByEmail(username)
                .orElseThrow(() -> new BadCredentialsException("Wrong credentials")));

        if(!username.equals(user.getUsername()) || !passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Wrong credentials");
        }
        return user;
    }

    private void authenticateUser(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
