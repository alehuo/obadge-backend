package com.alehuo.obadgebackend.controller;

import com.alehuo.obadgebackend.response.RestResponse;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

import java.io.UnsupportedEncodingException;
import java.util.concurrent.TimeUnit;

@RestController
public class AuthController {
    /**
     * Authenticates a user. Returns a JWT that is valid for 7 days, used when making requests into routes that require authentication.
     */
    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    public RestResponse authenticate(@RequestParam String username, @RequestParam String password) {
        String token = "";
        try {
            // Create a new JSON Web Token with an expiration time of 7 days,
            Algorithm algorithm = Algorithm.HMAC256("secret");
            token = JWT.create()
                    .withClaim("username", username)
                    .withClaim("password", password)
                    .withExpiresAt(new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(7)))
                    .withIssuer("auth0")
                    .sign(algorithm);
            return new AuthenticationResponse(true, "Authentication successful", token);
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

