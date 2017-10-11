package com.alehuo.obadgebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableOAuth2Sso
@EnableJpaRepositories
@EnableAutoConfiguration
@ComponentScan
@EntityScan
public class OBadgeBackendApplication {

    public static void main(String[] args) {
        init();
        SpringApplication.run(OBadgeBackendApplication.class, args);
    }

    /**
     * Checks for environment variables etc.
     */
    private static void init() {
        if(System.getenv("JWT_SECRET").trim().isEmpty()) {
            System.err.println("Please set the JWT_SECRET environment variable.");
            System.exit(1);
        }
    }
}
