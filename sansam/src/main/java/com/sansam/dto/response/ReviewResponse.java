package com.sansam.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {
    private int reviewNo;
    private String reviewerNicknm;
    private Character reviewRelDiff;
    private LocalDate reviewDate;
    private int reviewTime;
    private String reviewContent;
}
