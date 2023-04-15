package com.sansam.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TopTenCourseResponse {
    private int courseNo;
    private String courseMtNm;
    private int courseMtNo;
    private int courseUptime;
    private int courseDowntime;
    private BigDecimal courseLength;
}
