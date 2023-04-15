package com.sansam.data.repository;

import com.sansam.data.entity.Mountain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MountainRepository extends JpaRepository<Mountain, Integer> {

}