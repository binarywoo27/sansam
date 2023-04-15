package com.sansam.data.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "USER")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_NO", nullable = false)
    private int userNo;

    @Column(name = "USER_EMAIL", nullable = false)
    private String userEmail;

    @Column(name = "USER_NICKNM", nullable = false)
    private String userNicknm;

    @Column(name = "USER_AGE", nullable = false)
    private int userAge;

    @Column(name = "USER_GENDER", nullable = false)
    private Character userGender;

    @Column(name = "USER_LOCATION", nullable = false)
    private String userLocation;

    @Transient
    @Enumerated(EnumType.STRING)
    private Role userRole;

    @Builder
    public User(int userNo, String userEmail, String userNicknm, int userAge, Character userGender, String userLocation, Role userRole) {
        this.userNo = userNo;
        this.userEmail = userEmail;
        this.userNicknm = userNicknm;
        this.userAge = userAge;
        this.userGender = userGender;
        this.userLocation = userLocation;
        this.userRole = userRole;
    }

    public void updateSignUp(String userNicknm, int userAge, Character userGender, String userLocation) {
        this.userNicknm = userNicknm;
        this.userAge = userAge;
        this.userGender = userGender;
        this.userLocation = userLocation;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        return roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return this.userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}


