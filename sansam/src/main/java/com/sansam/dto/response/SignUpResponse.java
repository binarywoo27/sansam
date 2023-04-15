package com.sansam.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpResponse {
    private String accessToken;
    private String refreshToken;
}
