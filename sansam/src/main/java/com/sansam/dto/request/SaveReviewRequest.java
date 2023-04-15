package com.sansam.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class SaveReviewRequest {
    private int courseNo;
    private int reviewTime;
    private Character reviewDiff;
    private String reviewContent;
}
