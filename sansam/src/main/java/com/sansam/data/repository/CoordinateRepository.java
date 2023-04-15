package com.sansam.data.repository;

import com.sansam.data.entity.Coordinate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoordinateRepository extends JpaRepository<Coordinate, Integer> {
    List<Coordinate> findAllByCourseNo(int courseNo);
}
