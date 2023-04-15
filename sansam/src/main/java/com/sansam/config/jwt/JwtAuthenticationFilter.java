package com.sansam.config.jwt;

import com.sansam.service.UserDetailsServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtProvider jwtProvider;

    public JwtAuthenticationFilter(UserDetailsServiceImpl userDetailsService, JwtProvider jwtProvider) {
        this.userDetailsService = userDetailsService;
        this.jwtProvider = jwtProvider;
    }

    public Authentication getAuthentication(String userEmail) throws JwtException {
        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = jwtProvider.extractAccessToken(request);
        String refreshToken = jwtProvider.extractRefreshToken(request);

        if (accessToken != null) {
            try {
                String userEmail = jwtProvider.validateToken(accessToken);
                Authentication authentication = getAuthentication(userEmail);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (ExpiredJwtException e) {
                checkRefreshToken(refreshToken, response);
                accessToken = jwtProvider.createAccessToken(jwtProvider.validateToken(refreshToken));
                response.setHeader("X-ACCESS-TOKEN", accessToken);
                response.setStatus(201);
            } catch (JwtException e) {
                response.setStatus(500);
            }
        }
        filterChain.doFilter(request, response);
    }

    private void checkRefreshToken(String refreshToken, HttpServletResponse response) {
        if (refreshToken == null) {
            response.setStatus(401);
        } else {
            try {
                jwtProvider.validateToken(refreshToken);
            } catch (JwtException e) {
                response.setStatus(500);
            }
        }
    }
}
