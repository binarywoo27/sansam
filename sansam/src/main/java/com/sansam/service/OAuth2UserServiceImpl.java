package com.sansam.service;

import com.sansam.config.oauth.AuthUser;
import com.sansam.config.oauth.OAuthAttributes;
import com.sansam.data.entity.User;
import com.sansam.data.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserServiceImpl implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final UserRepository userRepository;
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName(); // OAuth2 로그인 시 키(PK)가 되는 값
        Map<String, Object> attributes = oAuth2User.getAttributes(); // 소셜 로그인에서 API가 제공하는 userInfo의 Json 값(유저 정보들)

        OAuthAttributes extractAttributes = OAuthAttributes.of(userNameAttributeName, attributes);
        User createdUser = getUser(extractAttributes); // getUser() 메소드로 User 객체 생성 후 반환

        // DefaultOAuth2User를 구현한 AuthUser 객체를 생성해서 반환
        return new AuthUser(
                Collections.singleton(new SimpleGrantedAuthority("USER")),
                attributes,
                extractAttributes.getNameAttributeKey(),
                createdUser.getUserRole(),
                createdUser.getUserEmail()
        );
    }

    private User getUser(OAuthAttributes attributes) {
        User findUser = userRepository.findByUserEmail(attributes.getAuthUserInfo().getEmail());

        if(findUser == null) {
            System.out.println("entered OAuth2UserSErviceImpl@@@@");
            return saveUser(attributes);
        }

        return findUser;
    }

    private User saveUser(OAuthAttributes attributes) {
        User createdUser = attributes.toEntity(attributes.getAuthUserInfo());
        return userRepository.save(createdUser);
    }

}