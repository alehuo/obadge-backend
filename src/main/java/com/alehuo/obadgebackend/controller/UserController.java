package com.alehuo.obadgebackend.controller;

import com.alehuo.obadgebackend.model.UserAccount;
import com.alehuo.obadgebackend.repository.UserAccountRepository;
import com.alehuo.obadgebackend.service.CryptoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserAccountRepository userRepo;

    @Autowired
    private CryptoService cryptoService;

    @RequestMapping(value = "/user/create", method = RequestMethod.POST)
    public void create(@RequestBody UserAccount userAccount) {
        userAccount.setPassword(cryptoService.encrypt(userAccount.getPassword()));
        userRepo.save(userAccount);
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public UserAccount getUser(@PathVariable Long id) {
        return userRepo.findOne(id);
    }
}
