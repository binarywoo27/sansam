package com.sansam.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateReviewRequest {
    private Character reviewRelDiff;
    private String reviewContent;
}
