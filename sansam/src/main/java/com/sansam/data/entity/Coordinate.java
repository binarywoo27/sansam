package com.sansam.data.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "COORDINATE")
public class Coordinate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COORD_NO", nullable = false)
    private int coordNo;

    @Column(name = "COURSE_NO", nullable = false)
    private int courseNo;

    @Column(name = "COORD_X", nullable = false)
    private BigDecimal coordX;

    @Column(name = "COORD_Y", nullable = false)
    private BigDecimal coordY;

    @Builder
    public Coordinate(int coordNo, int courseNo, BigDecimal coordX, BigDecimal coordY) {
        this.coordNo = coordNo;
        this.courseNo = courseNo;
        this.coordX = coordX;
        this.coordY = coordY;
    }
}
