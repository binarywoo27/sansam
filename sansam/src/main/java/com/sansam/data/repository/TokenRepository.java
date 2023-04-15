package com.sansam.data.repository;

import com.sansam.data.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<Token, Integer> {
    Token findByUserNo(int userNo);
    Token findByUserEmail(String userEmail);
}
