import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StyledButtonEasy from "./StyledButtonEasy";
import StyledButtonSoso from "./StyledButtonSoso";
import StyledButtonHard from "./StyledButtonHard";
import axios from "../../store/baseURL.js";
import { useAppSelector } from "../../store/hooks";

interface courseInfo {
  // props 타입.
  courseNo?: number;
  courseMtNm?: string;
  courseMtCd?: number;
  courseMtNo?: number;
  courseXCoords?: Array<number>;
  courseYCoords?: Array<number>;
  courseAbsDiff?: string;
  courseUptime?: number;
  courseDowntime?: number;
  courseLength?: number;
  courseLocation?: string;
  reviewDate?: Date;
  reviewTime?: number;
  reviewContent?: string;
}

function Review() {
  // accessToken, refreshToken 세션스토리지에서 가져와주기
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  const navigate = useNavigate();

  const courseData: courseInfo = useAppSelector(
    state => state.course.detailInfo
  );

  const moveToPhotoPage = () => {
    navigate("/mypage/myreview");
  };

  const [endTime, setEndTime] = useState(0);
  const [hikingTime, setHikingTime] = useState(0);

  const startTime: number = useAppSelector(state => state.course.timeInfo);

  useEffect(() => {
    setEndTime(Date.now());
    const consumedTime = endTime - startTime;
    setHikingTime(consumedTime);

    setReview({
      ...review,
      reviewTime: Math.floor(hikingTime / 60000),
    });
  }, [startTime, endTime]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
      window.alert("로그인이 필요한 페이지입니다.");
    }
  });

  const [easy, setEasy] = useState(false);
  const [soso, setSoso] = useState(false);
  const [hard, setHard] = useState(false);

  function easyToggle() {
    if (easy === false) setEasy(true);
    if (soso === true) setSoso(false);
    if (hard === true) setHard(false);

    setReview({
      ...review,
      reviewDiff: "E",
    });
  }

  function sosoToggle() {
    if (easy === true) setEasy(false);
    if (soso === false) setSoso(true);
    if (hard === true) setHard(false);

    setReview({
      ...review,
      reviewDiff: "N",
    });
  }

  function hardToggle() {
    if (easy === true) setEasy(false);
    if (soso === true) setSoso(false);
    if (hard === false) setHard(true);

    setReview({
      ...review,
      reviewDiff: "H",
    });
  }

  const [review, setReview] = useState({
    courseNo: courseData.courseNo,
    reviewTime: courseData.reviewTime,
    reviewDiff: "", // E,N,M 순
    reviewContent: "",
  });

  const changeReview = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    type: any
  ) => {
    setReview({
      ...review,
      [type]: event.target.value,
    });
  };

  const apiReviewInsert = () => {
    if (review.reviewDiff !== "" && review.reviewContent !== "") {
      axios
        .post(
          "/user/review/insert",
          {
            courseNo: Number(review.courseNo),
            reviewTime: Number(review.reviewTime),
            reviewDiff: review.reviewDiff,
            reviewContent: review.reviewContent,
          },
          {
            headers: {
              "X-ACCESS-TOKEN": sessionStorage.getItem("accessToken"),
              "X-REFRESH-TOKEN": sessionStorage.getItem("refreshToken"),
            },
          }
        )
        .then(response => {
          if (response.data) {
            sessionStorage.setItem(
              "accessToken",
              response.headers["x-access-token"]
            );
            moveToPhotoPage();
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert("등산 후기를 남겨주세요");
    }
  };

  return (
    <StyledDiv>
      <StyledHeader>
        {/* 오늘 "...{props.courseMtNm}+{props.courseMtNo}" <br /> 등산은 어땠나요??        // (3) props로 넘겨받은 정보로 코스명을 보여주기 */}
        오늘 "{courseData.courseLocation}&nbsp;{courseData.courseMtNm}&nbsp;
        {courseData.courseMtNo}코스" <br /> 등산은 어땠나요??
      </StyledHeader>
      <StyledBox>
        <StyledContainer>
          <StyledButtonEasy onClick={easyToggle} easy={easy} />
          <StyledButtonSoso onClick={sosoToggle} soso={soso} />
          <StyledButtonHard onClick={hardToggle} hard={hard} />
        </StyledContainer>
      </StyledBox>
      <StyledTextBox
        rows={8}
        placeholder="등산 후기를 자유롭게 입력해주세요"
        value={review.reviewContent}
        onChange={event => {
          changeReview(event, "reviewContent");
        }}
      ></StyledTextBox>
      <StyledSubmitButton onClick={apiReviewInsert}>
        저장하기
      </StyledSubmitButton>
    </StyledDiv>
  );
}

const StyledDiv = styled.div``;

const StyledBox = styled.div`
  /* margin: 5% 0 5%; */
`;

const StyledContainer = styled.div`
  padding: 0 10%;
  display: flex;
  font-weight: bold;
  font-family: "GmarketSansLight";
`;

const StyledHeader = styled.h1`
  margin-top: 8%;
  font-family: "GmarketSansLight";
  line-height: 150%;
  font-weight: bold;
  text-align: center;
  font-size: 6vw;
  padding: 4vw;
`;

const StyledTextBox = styled.textarea`
  margin-top: 10%;
  margin-left: 10%;
  width: 80%;
  resize: none;
  border-radius: 5px;
  border: 2px solid #d9d9d9;
  font-family: "GmarketSansLight";
  text-align: center;
  font-weight: bold;
`;

const StyledSubmitButton = styled.button`
  background-color: #238c47;
  color: white;
  font-family: "GmarketSansLight";
  font-size: 20px;
  border: 0;
  border-radius: 10px;
  width: 60%;
  margin-top: 10%;
  margin-left: 20%;
  height: 5vh;
  font-weight: bold;
  font-size: medium;
  border: 1px;
`;

export default Review;
