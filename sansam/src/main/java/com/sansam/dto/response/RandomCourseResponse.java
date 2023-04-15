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
public class RandomCourseResponse {
    private int courseNo;
    private String courseMtNm;
    private int courseMtNo;
    private BigDecimal courseElevDiff;
    private int courseUptime;
    private int courseDowntime;
    private BigDecimal courseLength;
    private String courseLocation;
    private String courseAddress;
}
