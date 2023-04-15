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
@Table(name = "FAVORITE")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FAV_NO", nullable = false)
    private int favNo;

    @Column(name = "USER_NO", nullable = false)
    private int userNo;

    @Column(name = "COURSE_NO", nullable = false)
    private int courseNo;

    @Builder
    public Favorite(int favNo, int userNo, int courseNo) {
        this.favNo = favNo;
        this.userNo = userNo;
        this.courseNo = courseNo;
    }

    public void createFavorite(int userNo, int courseNo) {
        this.userNo = userNo;
        this.courseNo = courseNo;
    }
}
