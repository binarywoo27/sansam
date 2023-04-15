import { useEffect, useState } from "react";
import axios from "../../store/baseURL.js";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

interface courseInfo {
  courseNo?: number;
  courseMtNm?: string;
  courseMtCd?: number;
  courseMtNo?: number;
  courseXCoords?: Array<number>;
  courseYCoords?: Array<number>;
  courseElevDiff?: string;
  courseUptime?: number;
  courseDowntime?: number;
  courseLength?: number;
  courseLocation?: string;
  courseAddress?: string;
}

function MyHeart() {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const navigate = useNavigate();

  const [favoriteCourses, setFavoriteCourses] = useState<courseInfo[]>([{}]);

  useEffect(() => {
    const getFavoriteCourse = async () => {
      const res = await axios.get("/user/favorite", {
        headers: {
          "X-ACCESS-TOKEN": accessToken,
          "X-REFRESH-TOKEN": refreshToken,
        },
      });
      setFavoriteCourses(res.data.favoriteCourses);
      // 세션스토리지 내 accessToken 갱신
      sessionStorage.setItem("accessToken", res.headers["x-access-token"]);
    };
    if (accessToken) {
      getFavoriteCourse();
    } else {
      navigate("/");
      window.alert("로그인이 필요한 페이지입니다.");
    }
  }, []);

  return (
    <div className="MyHeart">
      <StyledTab>
        <StyledLink to="/mypage/myheart">
          <StyledIcon src="/img/heart_pink.png" />
        </StyledLink>
        <StyledLink to="/mypage/myreview">
          <StyledIcon2 src="/img/flag_black.png" />
        </StyledLink>
        <StyledLink to="/mypage/mymap">
          <StyledIcon2 src="/img/map_black.png" />
        </StyledLink>
      </StyledTab>
      <StyledDiv>
        {favoriteCourses.map((course, idx) => (
          <ReviewCard
            key={idx}
            onClick={() => navigate(`/coursedetail/${course.courseNo}`)}
          >
            <StyledH3>
              {course.courseMtNm} {course.courseMtNo}코스
            </StyledH3>
            <StyledHr />
            <StyledP>
              <StyledSpan>코스길이 </StyledSpan>
              <span>{course.courseLength}km</span>
            </StyledP>
            <StyledP>
              <StyledSpan>상행시간 </StyledSpan>
              {course.courseUptime ? (
                <span>
                  {Math.floor(course.courseUptime / 60) ? (
                    <span>{Math.floor(course.courseUptime / 60)}시간 </span>
                  ) : null}
                  {course.courseUptime % 60 ? (
                    <span>{course.courseUptime % 60}분</span>
                  ) : null}
                </span>
              ) : null}
            </StyledP>
            <StyledP1>
              <StyledSpan>하행시간 </StyledSpan>
              {course.courseDowntime ? (
                <span>
                  {Math.floor(course.courseDowntime / 60) ? (
                    <span>{Math.floor(course.courseDowntime / 60)}시간 </span>
                  ) : null}
                  {course.courseDowntime % 60 ? (
                    <span>{course.courseDowntime % 60}분</span>
                  ) : null}
                </span>
              ) : null}
            </StyledP1>
          </ReviewCard>
        ))}
      </StyledDiv>
    </div>
  );
}

const StyledDiv = styled.div`
  padding-left: 15vw;
  padding-right: 15vw;
  margin-top: 5vw;
  font-family: "GmarketSansLight";
`;

const StyledH3 = styled.h3`
  margin-top: 4vw;
  margin-bottom: 3vw;
  font-weight: bold;
  font-size: 5vw;
`;

const StyledHr = styled.hr`
  margin-top: 0px;
  margin-left: -5vw;
  color: #d4d3d3;
  background-color: #d4d3d3;
  height: 1px;
  border: 0;
`;

const StyledP = styled.p`
  margin-top: 0px;
  margin-bottom: 5px;
  font-size: 4vw;
`;

const StyledP1 = styled.p`
  margin-top: 0px;
  margin-bottom: 8px;
  font-size: 4vw;
`;

const StyledSpan = styled.span`
  font-weight: bold;
`;

const ReviewCard = styled.div`
  border: 1px solid #d4d3d3;
  border-radius: 8px;
  padding-left: 18px;
  padding-right: 18px;
  padding-bottom: 7px;
  margin-bottom: 5vw;
  position: relative;
  box-shadow: 5px 5px 5px #b7b7b7;
`;

const StyledTab = styled.div`
  padding-top: 3vw;
  padding-bottom: 3vw;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
`;

const StyledIcon = styled.img`
  width: 10vw;
`;

const StyledIcon2 = styled.img`
  width: 9vw;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default MyHeart;
