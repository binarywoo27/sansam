import { useEffect, useState } from "react";
import styled from "styled-components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { userApi } from "../../api";
import MyHeart from "./MyHeart";
import MyReview from "./MyReview";
import MyMap from "./MyMap";

function MyPage() {
  // accessToken, refreshToken 세션스토리지에서 가져와주기
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  // navigate 사용하기 위해 정의해주기
  const navigate = useNavigate();

  // 유저이름 state에 담아서 사용해주기 -> 나중에 시간 남으면 store에 유저정보 저장해주면 좋을듯
  const [userName, setUserName] = useState<string>("");

  // 처음 마운트 됐을 때
  useEffect(() => {
    // 현재 로그인한 유저정보 받아오는 코드
    const getUserInfo = async () => {
      const res = await userApi.userInfo(accessToken, refreshToken);
      setUserName(res.data.userNicknm);
      // 세션스토리지 내 accessToken 갱신
      sessionStorage.setItem("accessToken", res.headers["x-access-token"]);
    };
    if (accessToken) {
      getUserInfo();
    } else {
      navigate("/");
      window.alert("로그인이 필요한 페이지입니다.");
    }
  }, []);

  return (
    <div className="MyPage">
      <StyledH2>{userName}님의 산삶</StyledH2>
      <Routes>
        <Route path="/myheart" element={<MyHeart />} />
        <Route path="/myreview" element={<MyReview />} />
        <Route path="/mymap" element={<MyMap />} />
      </Routes>
    </div>
  );
}

const StyledH2 = styled.h2`
  padding-top: 8vw;
  padding-left: 5vw;
  margin: 0px;
  font-family: "GmarketSansMedium";
  font-size: 6vw;
  margin-bottom: 5px;
`;

export default MyPage;
