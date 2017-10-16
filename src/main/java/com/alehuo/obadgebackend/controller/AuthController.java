package com.alehuo.obadgebackend.controller;

import com.alehuo.obadgebackend.model.UserAccount;
import com.alehuo.obadgebackend.repository.UserAccountRepository;
import com.alehuo.obadgebackend.request.AuthenticationRequest;
import com.alehuo.obadgebackend.response.RestResponse;
import com.alehuo.obadgebackend.service.CryptoService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

import java.io.UnsupportedEncodingException;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserAccountRepository uaRepo;

    @Autowired
    private CryptoService cryptoService;

    /**
     * Authenticates a user. Returns a JWT that is valid for 7 days, used when making requests into routes that require authentication.
     */
    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    public RestResponse authenticate(@RequestBody AuthenticationRequest authRequest, HttpServletResponse response) {
        String token = "";
        String email = authRequest.getEmail();
        String password = authRequest.getPassword();

        try {
            UserAccount ua = uaRepo.findUserAccountByEmail(email);

            // User account must be active and not banned
            if (ua != null && !ua.isBanned() && ua.isActive()) {
                String passwordHash = ua.getPassword();
                if (cryptoService.matches(password, passwordHash)) {
                    // Create a new JSON Web Token with an expiration time of 7 days,
                    Algorithm algorithm = Algorithm.HMAC256(System.getenv("JWT_SECRET"));
                    token = JWT.create()
                            .withClaim("email", email)
                            .withClaim("password", password)
                            .withExpiresAt(new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(7)))
                            .withIssuer("auth0")
                            .sign(algorithm);

                    // Cookie
                    Cookie c = new Cookie("token", token);
                    c.setHttpOnly(true);
                    c.setSecure(true);
                    c.setMaxAge(60*60*24*7);

                    response.addCookie(c);

                    return new AuthenticationResponse(true, "Authentication successful", token);
                } else {
                    AuthenticationResponse ar = new AuthenticationResponse(false, "Authentication failed", token);
                    ar.addError("Invalid email-address or password");

                    return ar;
                }


            } else {

                AuthenticationResponse ar = new AuthenticationResponse(false, "Authentication failed", token);

                if (ua != null) {
                    if (ua.isBanned()) {
                        ar.addError("User account is banned");
                    }
                    if (!ua.isActive()) {
                        ar.addError("User account is not active");
                    }
                } else {
                    ar.addError("Invalid email-address or password");
                }

                return ar;
            }


        } catch (UnsupportedEncodingException exception) {
            //UTF-8 encoding not supported
            return new AuthenticationResponse(false, "Authentication failed", token);
        } catch (JWTCreationException exception) {
            //Invalid Signing configuration / Couldn't convert Claims.
            return new AuthenticationResponse(false, "Authentication failed", token);
        }
    }

    /**
     * Authentication response
     */
    private class AuthenticationResponse extends RestResponse {

        /**
         * JSON Web Token for user authentication, stored client side.
         */
        public String token = "";

        public AuthenticationResponse(boolean success, String msg, String token) {
            super(success, msg);
            this.token = token;
        }
    }
}

