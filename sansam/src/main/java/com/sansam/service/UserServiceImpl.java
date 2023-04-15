package com.sansam.service;

import com.sansam.data.entity.*;
import com.sansam.data.repository.*;
import com.sansam.dto.request.*;
import com.sansam.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final FavoriteRepository favoriteRepository;
    private final ReviewRepository reviewRepository;
    private final CourseServiceImpl courseService;

    @Override
    @Transactional
    public void signUp(SignUpRequest signUpRequest) {
        User user = userRepository.findByUserNo(signUpRequest.getUserNo());
        user.updateSignUp(signUpRequest.getUserNicknm(), signUpRequest.getUserAge(), signUpRequest.getUserGender(), signUpRequest.getUserLocation());
    }

    @Override
    @Transactional
    public void saveRefreshToken(String refreshToken, int userNo) {
        Token token = tokenRepository.findByUserNo(userNo);
        User user = userRepository.findByUserNo(userNo);

        if (token == null) {
            token = new Token();
            token.createToken(userNo, user.getUserEmail(), refreshToken);
            tokenRepository.save(token);
        } else {
            token.updateRefreshToken(refreshToken);
            tokenRepository.save(token);
        }
    }

    @Override
    @Transactional
    public void signOut(String userEmail) {
        Token token = tokenRepository.findByUserEmail(userEmail);
        token.updateRefreshToken(null);
    }

    @Override
    public FavoriteListResponse getFavoriteList(String userEmail) {
        List<CourseResponse> favoriteCourses = new ArrayList<>();
        User user = userRepository.findByUserEmail(userEmail);
        List<Favorite> favorites = favoriteRepository.findAllByUserNo(user.getUserNo());
        for (Favorite favorite : favorites) {
            favoriteCourses.add(courseService.getCourseDetails(favorite.getCourseNo()));
        }

        return new FavoriteListResponse(favoriteCourses);
    }

    @Override
    @Transactional
    public void saveFavorite(int userNo, FavoriteRequest favoriteRequest) {
        Favorite favorite = new Favorite();
        favorite.createFavorite(userNo, favoriteRequest.getCourseNo());
        favoriteRepository.save(favorite);
    }

    @Override
    @Transactional
    public void deleteFavorite(int userNo, FavoriteRequest favoriteRequest) {
        favoriteRepository.deleteByUserNoAndCourseNo(userNo, favoriteRequest.getCourseNo());
    }

    @Override
    public ReviewListResponse getReviewList(String userEmail) {
        List<ReviewCourseResponse> reviewList = new ArrayList<>();
        User user = userRepository.findByUserEmail(userEmail);
        List<Review> reviews = reviewRepository.findAllByUserNoOrderByReviewNoDesc(user.getUserNo());
        for (Review review : reviews) {
            CourseResponse courseResponse = courseService.getCourseDetails(review.getCourseNo());
            reviewList.add(new ReviewCourseResponse(courseResponse.getCourseNo(), courseResponse.getCourseMtNm(), courseResponse.getCourseMtCd(), courseResponse.getCourseMtNo(), courseResponse.getCourseXCoords(), courseResponse.getCourseYCoords(), courseResponse.getCourseElevDiff(), courseResponse.getCourseUptime(), courseResponse.getCourseDowntime(), courseResponse.getCourseLength(), courseResponse.getCourseLocation(), courseResponse.getCourseAddress(), review.getReviewDate(), review.getReviewTime(), review.getReviewRelDiff(), review.getReviewContent()));
        }

        return new ReviewListResponse(reviewList);
    }

    @Override
    @Transactional
    public void saveReview(int userNo, SaveReviewRequest saveReviewRequest) {
        Review review = new Review();
        review.createReview(userNo, saveReviewRequest.getCourseNo(), LocalDate.now(), saveReviewRequest.getReviewTime(), saveReviewRequest.getReviewDiff(), saveReviewRequest.getReviewContent());
        reviewRepository.save(review);
    }

    @Override
    @Transactional
    public void updateReview(int userNo, int reviewNo, UpdateReviewRequest updateReviewRequest) {
        Review review = reviewRepository.findByUserNoAndReviewNo(userNo, reviewNo);
        review.updateReview(updateReviewRequest.getReviewRelDiff(), updateReviewRequest.getReviewContent());
        reviewRepository.save(review);
    }

    @Override
    @Transactional
    public void deleteReview(int userNo, int reviewNo) {
        Review review = reviewRepository.findByUserNoAndReviewNo(userNo, reviewNo);
        reviewRepository.delete(review);
    }

    @Override
    public Boolean isRecommendable(int userNo) {
        List<Review> reviewList = reviewRepository.findAllByUserNo(userNo);
        int cntE = 0;
        int cntN = 0;
        int cntH = 0;
        for (Review review : reviewList) {
            switch (review.getReviewRelDiff()) {
                case 'E':
                    cntE++;
                    break;
                case 'N':
                    cntN++;
                    break;
                default:
                    cntH++;
                    break;
            }
            if (cntE != 0 & cntN != 0 & cntH != 0) {
                return true;
            }
        }
        System.out.println(cntE + " " + cntN + " " + cntH);
        return false;
    }

    @Override
    public UserInfoResponse getUserInfo(String userEmail) {
        User user = userRepository.findByUserEmail(userEmail);

        return new UserInfoResponse(user.getUserEmail(), user.getUserNicknm(), user.getUserAge(), user.getUserGender(), user.getUserLocation());
    }

    @Override
    public Boolean isCourseInFavorite(String userEmail, int courseNo) {
        User user = userRepository.findByUserEmail(userEmail);
        Favorite favorite = favoriteRepository.findByUserNoAndCourseNo(user.getUserNo(), courseNo);

        if (favorite != null) {
            return true;
        } else {
            return false;
        }
    }
}
