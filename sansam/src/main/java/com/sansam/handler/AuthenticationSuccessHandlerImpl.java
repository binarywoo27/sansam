package com.sansam.handler;

import com.sansam.config.jwt.JwtProvider;
import com.sansam.config.oauth.AuthUser;
import com.sansam.data.entity.User;
import com.sansam.data.repository.UserRepository;
import com.sansam.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;


@Component
@RequiredArgsConstructor
public class AuthenticationSuccessHandlerImpl implements AuthenticationSuccessHandler {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;
    private final UserServiceImpl userService;

    @Value("${kakao-success-login-uri}")
    private String kakaoSuccessLoginUri;

    @Value("${kakao-success-signup-uri}")
    private String kakaoSuccessSignupUri;

    @Transactional
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        try {
            AuthUser authUser = (AuthUser) authentication.getPrincipal();
            User user = userRepository.findByUserEmail(authUser.getEmail());
            if (user.getUserAge() != 0) {
                String accessToken = jwtProvider.createAccessToken(user.getUserEmail());
                String refreshToken = jwtProvider.createRefreshToken(user.getUserEmail());
                userService.saveRefreshToken(refreshToken, user.getUserNo());
                response.sendRedirect(kakaoSuccessLoginUri+accessToken+"?"+refreshToken);
            } else {
                response.sendRedirect(kakaoSuccessSignupUri+user.getUserNo());
            }
        } catch (Exception e) {
            System.out.println(e);
        }

    }
}