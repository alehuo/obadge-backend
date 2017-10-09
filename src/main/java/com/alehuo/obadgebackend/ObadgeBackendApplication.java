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
public class ObadgeBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ObadgeBackendApplication.class, args);
	}
}
