package com.alehuo.obadgebackend.controller;

import com.alehuo.obadgebackend.model.EmailActivation;
import com.alehuo.obadgebackend.model.UserAccount;
import com.alehuo.obadgebackend.repository.EmailActivationRepository;
import com.alehuo.obadgebackend.repository.UserAccountRepository;
import com.alehuo.obadgebackend.request.EmailActivationRequest;
import com.alehuo.obadgebackend.response.RestResponse;
import com.alehuo.obadgebackend.response.UserResponse;
import com.alehuo.obadgebackend.service.CryptoService;
import com.google.common.hash.Hashing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Entity;
import java.nio.charset.StandardCharsets;
import java.util.Random;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserAccountRepository userRepo;

    @Autowired
    private EmailActivationRepository emailActivationRepository;

    @Autowired
    private CryptoService cryptoService;

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public UserResponse create(@RequestBody UserAccount userAccount) {
        userAccount.setPassword(cryptoService.encrypt(userAccount.getPassword()));
        userAccount.setActive(true);
        UserAccount ua = userRepo.findUserAccountByEmail(userAccount.getEmail());
        if (ua == null) {

            // Generate email activation hash
            String emailActivationHash = Hashing.sha256()
                    .hashString(userAccount.getEmail() + userAccount.getFirstName() + userAccount.getLastName() + userAccount.getTelephone() + (new Random().nextFloat()), StandardCharsets.UTF_8)
                    .toString();
            System.out.println(emailActivationHash);
            // Save user
            UserAccount savedUser = userRepo.save(userAccount);

            // Create new email activation
            EmailActivation ea = new EmailActivation();
            ea.setEmailHash(emailActivationHash);
            ea.setUserAccount(savedUser);

            // Save email activation hash
            emailActivationRepository.save(ea);

            return new UserResponse(true, "Account created successfully");
        } else {
            // Email address already exists
            UserResponse ur = new UserResponse(false, "Email address is in use");
            ur.addError("Email address is in use");
            return ur;
        }

    }

    /**
     * Returns a single user if it exists.
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public UserAccount getUser(@PathVariable Long id) {
        return userRepo.findOne(id);
    }

    @RequestMapping(value = "/user/activate", method = RequestMethod.POST)
    public UserResponse activateUser(@RequestBody EmailActivationRequest emailActivationResponse) {
        EmailActivation ea = emailActivationRepository.findByEmailHash(emailActivationResponse.getHash());
        if (ea != null) {
            // Get user account
            UserAccount ua = ea.getUserAccount();

            // Set user as active
            ua.setActive(true);

            // Update user
            userRepo.save(ua);

            // Destroy activation entry
            emailActivationRepository.delete(ea);

            return new UserResponse(true, "Activation successful");
        }
        UserResponse ur = new UserResponse(false, "Activation failed");
        ur.addError("Invalid hash");
        return ur;
    }

}
