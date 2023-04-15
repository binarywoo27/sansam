import styled from "styled-components";
import List from "./List";
import { useEffect, useState } from "react";
import MainBtn from "./MainBtn";
import { useAppDispatch } from "../../store/hooks";
import {
  changeAgeGender,
  changeCourses,
  changeTopTen,
} from "../../store/RecommendSlice";
import { courseApi, userApi } from "../../api";
import SearchBar from "./SearchBar";
import { changeUserInfo, changeIsRec } from "../../store/loginSlice";
import Loading from "../../Common/Loading/Loading";
import { useNavigate } from "react-router-dom";

function Main() {
  // dispatch/navigate 사용하기 위해 정의해주기
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 코스 추천 가능 여부 state
  const [isRec, setIsRec] = useState<boolean>(false);

  // 로딩 여부 state
  const [loading, setLoading] = useState(true);

  // accessToken, refreshToken 세션스토리지에서 가져와주기
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  // 처음 마운트 됐을 때
  useEffect(() => {
    // 1. 성별, 나이에 맞는 코스 정보 받아와서 store에 저장해주기 (axios 모듈화, recommendSlice 사용)
    const getageGender = async () => {
      try {
        const res = await courseApi.ageGender(accessToken, refreshToken);
        dispatch(changeAgeGender(res.data));
        // 세션스토리지 내 accessToken 갱신
        sessionStorage.setItem("accessToken", res.headers["x-access-token"]);
      } catch (err) {
        console.log(err);
      }
    };
    // 2. 유저 정보 받아와서 store에 저장해주기
    const getUserInfo = async () => {
      try {
        const res = await userApi.userInfo(accessToken, refreshToken);
        dispatch(changeUserInfo(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    // 3-1. 난이도별 코스 추천 받을 수 있는지 여부 store에 저장해주기
    const getIsRec = async () => {
      try {
        const res = await userApi.isRec(accessToken, refreshToken);
        setIsRec(res.data);
        dispatch(changeIsRec(res.data));
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    // 3-3. 리뷰 최다 top10 코스 목록 store에 저장해주기
    const getTopTen = async () => {
      try {
        const res = await courseApi.topTen(accessToken, refreshToken);
        dispatch(changeTopTen(res.data.topTenCourseList));
      } catch (err) {
        console.log(err);
      }
    };
    if (accessToken) {
      getageGender();
      getUserInfo();
      getIsRec();
      getTopTen();
    } else {
      navigate("/");
      window.alert("로그인이 필요한 페이지입니다.");
    }
  }, []);

  useEffect(() => {
    // 3-2. 코스 정보 받아와서 store에 저장해주기
    const getCourses = async () => {
      try {
        const res = await courseApi.recommend(accessToken, refreshToken);
        dispatch(changeCourses(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    if (isRec) {
      getCourses();
    }
  }, [isRec]);

  return (
    <StyledDiv className="Main">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <StyledH>어떤 산으로 떠나고 싶으신가요?</StyledH>
          <SearchBar />
          <MainBtn />
          <List />
        </div>
      )}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding-top: 8vw;
`;

const StyledH = styled.p`
  text-align: center;
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 5.6vw;
  margin-bottom: 12px;
`;

export default Main;
