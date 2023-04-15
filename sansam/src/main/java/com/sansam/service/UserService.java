package com.sansam.service;

import com.sansam.dto.request.*;
import com.sansam.dto.response.FavoriteListResponse;
import com.sansam.dto.response.ReviewListResponse;
import com.sansam.dto.response.UserInfoResponse;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    void signUp(SignUpRequest signUpRequest);
    void saveRefreshToken(String refreshToken, int userNo);
    void signOut(String userEmail);
    FavoriteListResponse getFavoriteList(String userEmail);
    void saveFavorite(int userNo, FavoriteRequest favoriteRequest);
    void deleteFavorite(int userNo, FavoriteRequest favoriteRequest);
    ReviewListResponse getReviewList(String userEmail);
    void saveReview(int userNo, SaveReviewRequest saveReviewRequest);
    void updateReview(int userNo, int courseNo, UpdateReviewRequest updateReviewRequest);
    void deleteReview(int userNo, int courseNo);
    Boolean isRecommendable(int userNo);
    UserInfoResponse getUserInfo(String userEmail);
    Boolean isCourseInFavorite(String userEmail, int courseNo);
}
