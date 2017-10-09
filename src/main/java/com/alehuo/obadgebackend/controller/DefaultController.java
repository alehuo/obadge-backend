package com.alehuo.obadgebackend.controller;

import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class DefaultController {

    @RequestMapping(value = "/github_auth", method = RequestMethod.GET)
    public String index(OAuth2Authentication authentication) {

        OAuth2Authentication auth2 = authentication;
        return "index";
    }
}
