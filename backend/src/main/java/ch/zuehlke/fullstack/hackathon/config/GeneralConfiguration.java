package ch.zuehlke.fullstack.hackathon.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@EnableWebSecurity
public class GeneralConfiguration extends WebSecurityConfigurerAdapter {

    @Value("${app.cors.allowed-origins}")
    private String[] allowedOrigins;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors().configurationSource(request -> {
            var cors = new CorsConfiguration();
            cors.setAllowedOrigins(List.of(allowedOrigins));
            cors.setAllowedMethods(List.of("GET", "POST"));
            cors.setAllowedHeaders(List.of("*"));
            return cors;
        }).and().csrf().disable();
    }
}
