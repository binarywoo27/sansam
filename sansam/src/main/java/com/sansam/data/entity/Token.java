package com.sansam.data.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "TOKEN")
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TOKEN_NO", nullable = false)
    private int tokenNo;

    @Column(name = "USER_NO", nullable = false)
    private int userNo;

    @Column(name = "USER_EMAIL", nullable = false)
    private String userEmail;

    @Column(name = "TOKEN_REFRESHTOKEN")
    private String tokenRefreshToken;

    @Builder
    public Token(int tokenNo, int userNo, String userEmail, String refreshToken) {
        this.tokenNo = tokenNo;
        this.userNo = userNo;
        this.userEmail = userEmail;
        this.tokenRefreshToken = refreshToken;
    }

    public void createToken(int userNo, String userEmail, String refreshToken) {
        this.userNo = userNo;
        this.userEmail = userEmail;
        this.tokenRefreshToken = refreshToken;
    }

    public void updateRefreshToken(String refreshToken) {
        this.tokenRefreshToken = refreshToken;
    }
}
