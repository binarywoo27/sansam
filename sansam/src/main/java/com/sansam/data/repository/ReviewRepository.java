package com.sansam.data.repository;

import com.sansam.data.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findAllByUserNo(int userNo);
    List<Review> findAllByUserNoOrderByReviewNoDesc(int userNo);
    List<Review> findAllByCourseNo(int courseNo);
    Review findByUserNoAndReviewNo(int userNo, int reviewNo);
}
