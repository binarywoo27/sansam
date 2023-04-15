package com.sansam.controller;

import com.sansam.config.jwt.JwtProvider;
import com.sansam.data.entity.User;
import com.sansam.data.repository.UserRepository;
import com.sansam.dto.request.*;
import com.sansam.dto.response.*;
import com.sansam.service.UserServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;


@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private final JwtProvider jwtProvider;
    private final UserServiceImpl userService;
    private final UserRepository userRepository;

    @ApiOperation(
			value = "카카오 OAuth 회원가입",
			notes = "회원가입이 성공적으로 이루어지면 해당 회원의 accessToken과 refreshToken을 반환하고, 실패하면 Fail message를 출력한다.")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        try {
            userService.signUp(signUpRequest);
            User user = userRepository.findByUserNo(signUpRequest.getUserNo());

            String accessToken = jwtProvider.createAccessToken(user.getUserEmail());
            String refreshToken = jwtProvider.createRefreshToken(user.getUserEmail());
            userService.saveRefreshToken(refreshToken, user.getUserNo());

            SignUpResponse signUpResponse = new SignUpResponse();
            signUpResponse.setAccessToken(accessToken);
            signUpResponse.setRefreshToken(refreshToken);
            return new ResponseEntity<>(signUpResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed sign up.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "로그아웃",
			notes = "로그아웃 과정에서 refreshToken을 만료시키고 성공하면 Success를, 실패 시 Fail message를 반환한다.")
    @GetMapping("/signout")
    public ResponseEntity<String> signOut(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);

        try {
            userService.signOut(userEmail);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed sign out.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "찜 목록",
			notes = "해당 유저의 찜 목록을 조회하고 성공하면 찜 목록을, 실패하면 Fail message를 반환한다.")
    @GetMapping("/favorite")
    public ResponseEntity<?> getFavoriteList(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);

        try {
            FavoriteListResponse favoriteListResponse = userService.getFavoriteList(userEmail);
            return new ResponseEntity<>(favoriteListResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed getting favorite list.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "해당 코스 찜 여부 반환",
            notes = "해당 유저가 해당 코스를 찜 했는지 여부를 조회하고, 찜을 했으면 True를, 찜을 하지 않았으면 False를 반환한다.")
    @GetMapping("/favorite/is-enrolled/{courseNo}")
    public ResponseEntity<?> isCourseInFavorite(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @PathVariable int courseNo) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);

        try {
            Boolean isCourseInFavorite = userService.isCourseInFavorite(userEmail, courseNo);
            if (isCourseInFavorite) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Failed checking favorite list enrollment.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "찜 추가",
            notes = "해당 유저의 찜 목록에 코스를 추가하고, 성공하면 Success를, 실패하면 Fail message를 반환한다.")
    @PostMapping("/favorite/insert")
    public ResponseEntity<?> saveFavorite(@RequestHeader(value="X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @RequestBody FavoriteRequest favoriteRequest) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.saveFavorite(user.getUserNo(), favoriteRequest);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed saving favorite.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "찜 목록에서 삭제",
			notes = "코스 번호에 해당하는 코스를 찜 목록에서 삭제하고, 성공하면 찜 목록을, 실패하면 Fail message를 반환한다.")
    @DeleteMapping("/favorite/delete")
    public ResponseEntity<?> deleteFavorite(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @RequestBody FavoriteRequest favoriteRequest) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.deleteFavorite(user.getUserNo(), favoriteRequest);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed deleting favorite.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
			value = "리뷰 목록",
			notes = "해당 유저의 리뷰 목록을 조회하고 성공하면 리뷰 목록을, 실패하면 Fail message를 반환한다.")
    @GetMapping("/review")
    public ResponseEntity<?> getReviewList(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        System.out.println(response.getHeader("X-ACCESS-TOKEN"));

        String userEmail = jwtProvider.getEmailFromToken(accessToken);

        try {
            ReviewListResponse reviewListResponse = userService.getReviewList(userEmail);
            return new ResponseEntity<>(reviewListResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed getting review list.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "리뷰 추가",
            notes = "해당 유저의 리뷰 목록에 리뷰를 추가하고, 성공하면 Success를, 실패하면 Fail message를 반환한다.")
    @PostMapping("/review/insert")
    public ResponseEntity<?> saveReview(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @RequestBody SaveReviewRequest saveReviewRequest) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.saveReview(user.getUserNo(), saveReviewRequest);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed saving review.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "리뷰 수정",
            notes = "해당 유저의 해당 코스 리뷰를 수정하고, 성공하면 Success를, 실패하면 Fail message를 반환한다.")
    @PutMapping("/review/update/{reviewNo}")
    public ResponseEntity<String> updateReview(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @PathVariable int reviewNo, @RequestBody UpdateReviewRequest updateReviewRequest) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.updateReview(user.getUserNo(), reviewNo, updateReviewRequest);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed updating review.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "리뷰 삭제",
            notes = "해당 유저의 해당 코스 리뷰를 삭제하고, 성공하면 Success를, 실패하면 Fail message를 반환한다.")
    @DeleteMapping("/review/delete/{reviewNo}")
    public ResponseEntity<String> deleteReview(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response, @PathVariable int reviewNo) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            userService.deleteReview(user.getUserNo(), reviewNo);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed deleting review.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "Flask용 토큰 인증 및 이메일 반환 API",
            notes = "Flask에서 JWT 토큰 인증을 Spring Boot를 통해 진행하고, 진행 과정에서 accessToken의 변화를 헤더에 저장하여 반환하고, 유저의 이메일을 반환한다.")
    @GetMapping("/email")
    public ResponseEntity<EmailResponse> getEmail(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        EmailResponse emailResponse = new EmailResponse(userEmail);
        return new ResponseEntity<>(emailResponse, HttpStatus.OK);
    }

    @ApiOperation(
            value = "난이도별 코스 추천 가능 여부 반환",
            notes = "난이도별 코스 추천 가능 여부를 조회하고, 가능하면 True를, 불가능하면 False를, 조회 실패 시 Fail을 반환한다.")
    @GetMapping("/main/is-recommendable")
    public ResponseEntity<?> isRecommendable(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);
        User user = userRepository.findByUserEmail(userEmail);

        try {
            if (userService.isRecommendable(user.getUserNo())) {
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.OK);
            }
        } catch (Exception e) {
                return new ResponseEntity<>("Failed checking whether course recommendation by difficulty is possible.", HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(
            value = "유저 정보 반환",
            notes = "접속 중인 유저의 정보를 조회하고, 성공 시 유저 정보를 반환하고, 실패 시 Fail message를 반환한다.")
    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo(@RequestHeader(value = "X-ACCESS-TOKEN") String accessToken, HttpServletResponse response) {
        if (response.getHeader("X-ACCESS-TOKEN") != null) {
            accessToken = response.getHeader("X-ACCESS-TOKEN");
        } else {
            response.setHeader("X-ACCESS-TOKEN", accessToken);
        }

        String userEmail = jwtProvider.getEmailFromToken(accessToken);

        try {
            UserInfoResponse userInfoResponse = userService.getUserInfo(userEmail);
            return new ResponseEntity<>(userInfoResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed getting user info.", HttpStatus.BAD_REQUEST);
        }
    }
}
