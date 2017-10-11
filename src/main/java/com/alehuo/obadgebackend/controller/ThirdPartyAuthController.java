package com.alehuo.obadgebackend.controller;

import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/auth")
public class ThirdPartyAuthController {

    /**
     * GitHub authentication.
     *
     * @param authentication Authentication.
     * @return View.
     */
    @RequestMapping(value = "/github_auth", method = RequestMethod.GET)
    public String githubAuth(OAuth2Authentication authentication) {
        OAuth2Authentication auth2 = authentication;
        return "redirect://https://github.com";
    }

    /**
     * Google authentication.
     *
     * @param authentication Authentication.
     * @return View.
     */
    @RequestMapping(value = "/google_auth", method = RequestMethod.GET)
    public String googleAuth(OAuth2Authentication authentication) {
        OAuth2Authentication auth2 = authentication;
        return "redirect://https://google.com";
    }
}
