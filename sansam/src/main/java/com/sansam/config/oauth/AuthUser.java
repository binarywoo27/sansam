package com.sansam.config.oauth;

import com.sansam.data.entity.Role;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.Map;

@Getter
public class AuthUser extends DefaultOAuth2User {
    private Role role;
    private String email;

    /**
     * Constructs a {@code DefaultOAuth2User} using the provided parameters.
     *
     * @param authorities      the authorities granted to the user
     * @param attributes       the attributes about the user
     * @param nameAttributeKey the key used to access the user's &quot;name&quot; from
     *                         {@link #getAttributes()}
     */
    public AuthUser(
            Collection<? extends GrantedAuthority> authorities,
            Map<String, Object> attributes, String nameAttributeKey, Role role, String email) {
        super(authorities, attributes, nameAttributeKey);
        Map<String, Object> account = (Map<String, Object>) attributes.get("kakao_account");
        this.role = role;
        this.email = (String) account.get("email");
    }
}
