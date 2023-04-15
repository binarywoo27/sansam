import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import HamBtn from "./HamBtn";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api";
import axios from "axios";

function Navbar() {
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

  const navigate = useNavigate();

  const moveToMain = () => {
    navigate("/main");
    setToggleOn(false);
  };

  const moveToFilterMt = () => {
    navigate("/filtermt");
    setToggleOn(!toggleOn);
  };

  const moveToFilterRg = () => {
    navigate("/filterrg");
    setToggleOn(!toggleOn);
  };

  const moveToMypage = () => {
    navigate("/mypage/myreview");
    setToggleOn(!toggleOn);
  };

  const logOUt = async () => {
    const res = await userApi.logOut(accessToken, refreshToken);
    if (res.data === "Success") {
      sessionStorage.clear();
      navigate("/");
      setToggleOn(!toggleOn);
    } else {
      console.log(res.data);
    }
  };

  const [toggleOn, setToggleOn] = useState<boolean>(false);

  const openMenu = () => {
    setToggleOn(!toggleOn);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setToggleOn(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  return (
    <StyledTop className="Navbar" ref={ref}>
      <StyledDiv>
        <StyledImg
          onClick={moveToMain}
          className="logoImg"
          src="/img/logo1_1.png"
          alt="logo"
        />
        <HamBtn onClick={openMenu} />
      </StyledDiv>
      {toggleOn === true ? (
        <StyledUl>
          <StyledLi onClick={moveToMain}>홈으로</StyledLi>
          <StyledHr />
          <StyledLi onClick={moveToFilterMt}>산으로 추천받기</StyledLi>
          <StyledHr />
          <StyledLi onClick={moveToFilterRg}>지역으로 추천받기</StyledLi>
          <StyledHr />
          <StyledLi onClick={moveToMypage}>마이페이지</StyledLi>
          <StyledHr />
          <StyledLi onClick={logOUt}>로그아웃</StyledLi>
        </StyledUl>
      ) : null}
    </StyledTop>
  );
}

const StyledTop = styled.div`
  z-index: 1000;
`;
const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  width: 100%;
  background-color: white;
  border-bottom: 2px solid #d9d9d9;
`;

const StyledImg = styled.img`
  margin-left: 10px;
  margin-top: 10px;
  height: 55px;
  width: 80px;
`;

const StyledUl = styled.ul`
  position: absolute;
  justify-content: end;
  border-bottom: 2px solid #d9d9d9;
  margin-top: 0px;
  padding-left: 25px;
  padding-top: 15px;
  padding-bottom: 10px;
  background-color: white;
  width: 100%;
`;

const StyledLi = styled.li`
  font-family: "GmarketSansMedium";
  font-size: 5vw;
  list-style: none;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const StyledHr = styled.hr`
  margin: 0px;
  width: 90%;
  border: 1px solid #e3e3e3;
`;
export default Navbar;
