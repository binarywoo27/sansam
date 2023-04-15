package com.sansam.data.repository;

import com.sansam.data.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {

    List<Favorite> findAllByUserNo(int userNo);
    void deleteByUserNoAndCourseNo(int userNo, int courseNo);
    Favorite findByUserNoAndCourseNo(int userNo, int courseNo);
}
