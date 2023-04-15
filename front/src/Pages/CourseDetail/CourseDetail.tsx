import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import axios from "../../store/baseURL.js";
import Kakaomap from "./Kakaomap";
import ReviewList from "./ReviewList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { courseActions } from "../../store/courseSlice";
import Loading from "../../Common/Loading/Loading";
import { UserInfo } from "../../store/loginSlice";

interface courseInfo {
  courseNo?: number;
  courseMtNm?: string;
  courseMtCd?: number;
  courseMtNo?: number;
  courseXCoords?: number[];
  courseYCoords?: number[];
  courseAbsDiff?: string;
  courseUptime?: number;
  courseDowntime?: number;
  courseLength?: number;
  courseLocation?: string;
  courseAddress?: string;
}

function CourseDetail() {
  const [courseData, setCourseData] = useState<courseInfo>({});
  const [isClicked, setIsClicked] = useState<boolean>(false);

  // 로딩 중 state
  const [loading, setLoading] = useState(true);

  // navigate, location 사용
  const navigate = useNavigate();
  const location = useLocation();

  // access token, refresh token 가져오기
  const AccessToken = sessionStorage.getItem("accessToken");
  const RefreshToken = sessionStorage.getItem("refreshToken");

  // 코스 번호
  const id = location.pathname.slice(14);

  const moveToHiking = () => {
    navigate("/hiking", { state: courseData });
    dispatch(courseActions.addTime(Date.now()));
  };

  // 빈 하트 클릭 시 찜 axios 요청 & isClicked 상태 변경
  const clickHeart = async () => {
    await axios.post(
      "/user/favorite/insert",
      {
        courseNo: id,
      },
      {
        headers: {
          "X-ACCESS-TOKEN": AccessToken,
          "X-REFRESH-TOKEN": RefreshToken,
        },
      }
    );
    setIsClicked(!isClicked);
  };

  // 꽉 찬 하트 클릭 시 찜 해제 axios 요청 & isClicked 상태 변경
  const unClickedHeart = async () => {
    try {
      await axios.delete("user/favorite/delete", {
        headers: {
          "X-ACCESS-TOKEN": AccessToken,
          "X-REFRESH-TOKEN": RefreshToken,
        },
        data: {
          courseNo: id,
        },
      });
      setIsClicked(!isClicked);
    } catch (err) {
      console.log(err);
    }
  };

  // redux에 값 저장
  const dispatch = useAppDispatch();

  // axios 요청 : 코스 데이터 가져오기
  useEffect(() => {
    if (AccessToken) {
      axios
        .get(`/course/search/${id}`, {
          headers: {
            "X-ACCESS-TOKEN": AccessToken,
            "X-REFRESH-TOKEN": RefreshToken,
          },
          params: {
            courseNo: id,
          },
        })
        .then(res => {
          setCourseData(res.data);
          dispatch(courseActions.addCourse(res.data));
          setLoading(false);
          // 세션스토리지 내 accessToken 갱신
          sessionStorage.setItem("accessToken", res.headers["x-access-token"]);
        })
        .catch(err => console.log(err));
    } else {
      navigate("/");
      window.alert("로그인이 필요한 페이지입니다.");
    }
  }, []);

  // isClicked 변경될때마다 찜 여부 받아와 state에 반영
  useEffect(() => {
    if (AccessToken) {
      try {
        const getIsEnrolled = async () => {
          const res = await axios.get(`/user/favorite/is-enrolled/${id}`, {
            headers: {
              "X-ACCESS-TOKEN": AccessToken,
              "X-REFRESH-TOKEN": RefreshToken,
            },
          });
          setIsClicked(res.data);
          // 세션스토리지 내 accessToken 갱신
          sessionStorage.setItem("accessToken", res.headers["x-access-token"]);
        };
        getIsEnrolled();
      } catch (err) {
        console.log(err);
      }
    }
  }, [isClicked]);

  return (
    <div className="CourseDetail">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <StyledDiv>
            <StyledTitle>
              {courseData.courseLocation}&nbsp;
              {courseData.courseMtNm}&nbsp;
              {courseData.courseMtNo}코스
              {isClicked ? (
                <StyledIcon
                  src="/img/heart_pink.png"
                  alt="하트"
                  onClick={unClickedHeart}
                />
              ) : (
                <StyledIcon
                  src="/img/heart_black.png"
                  alt="하트"
                  onClick={clickHeart}
                />
              )}
            </StyledTitle>
          </StyledDiv>
          {courseData.courseXCoords && courseData.courseYCoords ? (
            <Kakaomap
              courseXCoords={courseData.courseXCoords}
              courseYCoords={courseData.courseYCoords}
            />
          ) : null}
          <StyledDiv2>
            <StyledContent>
              코스 길이 : <StyledSpan>{courseData.courseLength}km</StyledSpan>
            </StyledContent>
            {courseData.courseUptime ? (
              <StyledContent>
                상행 시간 :{" "}
                <StyledSpan>
                  {Math.floor(courseData.courseUptime / 60)}시간{" "}
                  {Math.floor(courseData.courseUptime % 60)}분
                </StyledSpan>
              </StyledContent>
            ) : null}

            {courseData.courseDowntime ? (
              <StyledContent>
                하행 시간 :{" "}
                <StyledSpan>
                  {Math.floor(courseData.courseDowntime / 60)}
                  시간 {Math.floor(courseData.courseDowntime % 60)}분
                </StyledSpan>
              </StyledContent>
            ) : null}
          </StyledDiv2>

          <StyledBtn onClick={moveToHiking}>시작하기</StyledBtn>

          <ReviewList id={id} />
        </div>
      )}
    </div>
  );
}

const StyledDiv = styled.div`
  margin-top: 40px;
  margin-left: 40px;
`;

const StyledDiv2 = styled.div`
  margin-top: 30px;
  margin-left: 40px;
`;

const StyledTitle = styled.p`
  font-family: "GmarketSansMedium";
  font-size: 25px;
  margin: 0px;
`;

const StyledIcon = styled.img`
  margin-left: 6px;
  width: 40px;
`;

const StyledContent = styled.p`
  font-family: "GmarketSansLight";
  font-size: 18px;
  margin: 5px;
`;

const StyledSpan = styled.span`
  font-family: "GmarketSansMedium";
  /* font-weight: 1000; */
`;
const StyledBtn = styled.button`
  background-color: #238c47;
  color: white;
  font-family: "GmarketSansMedium";
  font-size: 20px;
  border: 0;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 12px;
  width: 70%;
  height: 50px;
  margin-left: 15%;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export default CourseDetail;
