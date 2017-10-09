package com.alehuo.obadgebackend.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service("cryptoService")
public class CryptoService {

    private BCryptPasswordEncoder encoder;

    public CryptoService() {
        encoder = new BCryptPasswordEncoder();
    }

    public String encrypt(String password) {
        return encoder.encode(password);
    }

    public boolean matches(String password, String hash) {
        return encoder.matches(password, hash);
    }
}
