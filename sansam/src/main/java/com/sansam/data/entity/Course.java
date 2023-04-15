package com.sansam.data.entity;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "COURSE")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COURSE_NO", nullable = false)
    private int courseNo;

    @Column(name = "COURSE_MT_CD", nullable = false)
    private String courseMtCd;

    @Column(name = "COURSE_MT_NM", nullable = false)
    private String courseMtNm;

    @Column(name = "COURSE_MT_NO", nullable = false)
    private int courseMtNo;

    @Column(name = "COURSE_ELEV_DIFF", nullable = false)
    private BigDecimal courseElevDiff;

    @Column(name = "COURSE_UPTIME", nullable = false)
    private int courseUptime;

    @Column(name = "COURSE_DOWNTIME", nullable = false)
    private int courseDowntime;

    @Column(name = "COURSE_LENGTH", nullable = false)
    private BigDecimal courseLength;

    @Column(name = "COURSE_LOCATION", nullable = false)
    private String courseLocation;

    @Column(name = "COURSE_ADDRESS", nullable = false)
    private String courseAddress;

    @Builder
    public Course(int courseNo, String courseMtCd, String courseMtNm, int courseMtNo, BigDecimal courseElevDiff, int courseUptime, int courseDowntime, BigDecimal courseLength, String courseLocation, String courseAddress) {
        this.courseNo = courseNo;
        this.courseMtCd = courseMtCd;
        this.courseMtNm = courseMtNm;
        this.courseMtNo = courseMtNo;
        this.courseElevDiff = courseElevDiff;
        this.courseUptime = courseUptime;
        this.courseDowntime = courseDowntime;
        this.courseLength = courseLength;
        this.courseLocation = courseLocation;
        this.courseAddress = courseAddress;
    }
}
