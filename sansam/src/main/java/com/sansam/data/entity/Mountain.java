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
@Table(name = "MOUNTAIN")
public class Mountain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MT_NO")
    private int mtNo;

    @Column(name = "MT_NM")
    private String mtNm;

    @Builder
    public Mountain(int mtNo, String mtNm) {
        this.mtNo = mtNo;
        this.mtNm = mtNm;
    }
}