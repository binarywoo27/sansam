package com.sansam.handler;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;



@Component
public class AuthenticationFailureHandlerImpl implements AuthenticationFailureHandler {
    @Value("${kakao-failure-login-uri}")
    private String kakaoFailureLoginUri;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.getWriter().write("로그인에 실패했습니다. 로그인 초기 화면으로 돌아갑니다.");
        response.sendRedirect(kakaoFailureLoginUri);
    }
}