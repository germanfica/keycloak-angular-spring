package com.tutorial.keycloakbackend.config;

import org.keycloak.adapters.KeycloakConfigResolver;
import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;

@Configuration
public class KeycloakConfig {
    // == beans methods ==
    @Bean
    protected SessionRegistry buildSessionRegistry() {
        return new SessionRegistryImpl();
    }

    /**
     * By Default, the Spring Security Adapter looks for a keycloak.json configuration
     * file. You can make sure it looks at the configuration provided by the Spring
     * Boot Adapter by adding this bean.
     *
     * Docs: https://www.keycloak.org/docs/latest/securing_apps/index.html#using-spring-boot-configuration
     *
     * @return
     */
    @Bean
    public KeycloakConfigResolver keycloakConfigResolver(){
        return new KeycloakSpringBootConfigResolver();
    }
}
