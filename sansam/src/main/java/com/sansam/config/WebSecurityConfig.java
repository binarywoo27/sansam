package com.sansam.config;

import com.sansam.config.jwt.JwtAuthenticationFilter;
import com.sansam.config.jwt.JwtProvider;
import com.sansam.service.OAuth2UserServiceImpl;
import com.sansam.service.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtProvider jwtProvider;

    private final UserDetailsServiceImpl userDetailsService;

    private final OAuth2UserServiceImpl oAuth2UserServiceImpl;

    private final AuthenticationSuccessHandler authenticationSuccessHandler;

    private final AuthenticationFailureHandler authenticationFailureHandler;

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://j8d205.p.ssafy.io", "http://j8d205.p.ssafy.io", "http://localhost:5001", "https://j8d205.p.ssafy.io/flask-api"));

		configuration.setAllowedOriginPatterns(Arrays.asList("*"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "DELETE", "PUT", "OPTIONS"));
		configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("X-ACCESS-TOKEN"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .formLogin().disable()
            .httpBasic().disable()
            .csrf().disable()
            .headers().frameOptions().disable()
            .and()
            .cors().configurationSource(corsConfigurationSource())
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers(HttpMethod.OPTIONS).permitAll()
            .antMatchers("/", "/login/*").permitAll()
//                .antMatchers("/", "/auth/**", "/js/**", "/image/**", "/webjars/**").permitAll()
            .and()
            .oauth2Login()
            .userInfoEndpoint().userService(oAuth2UserServiceImpl)
            .and()
            .successHandler(authenticationSuccessHandler)
            .failureHandler(authenticationFailureHandler);
        http
            .addFilterBefore(new JwtAuthenticationFilter(userDetailsService, jwtProvider), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
