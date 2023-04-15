import React from "react";
import styled from "styled-components";

import "./SignUp2.css";
import SearchBar from "./Components/SearchBar";
import ExperienceList from "./Components/ExperienceList";
import { useState } from "react";

import { useAppSelector } from "../../store/hooks";
import { Exp } from "../../store/signup2Slice";
// import { ExpList } from "../../store/signup2Slice";
import { useSelector } from "react-redux/es/exports";

function SignUp2() {
  // 리덕스에서 가져온 exDiff값 중에 ""이 있으면 0, 아니면 1
  const [btnActivator, SetBtnActivator] = useState(0);

  const exp: Exp[] = useAppSelector((state) => state.signup2);
  // const exDiff = useSelector<Exp>(state => state.exDiff)
  console.log("exp위");
  console.log(exp);

  return (
    <div className="SignUp2">
      <h1>Navbar is here</h1>
      <div className="SignUp2Title">
        <p>최근 1년 내 다녀온</p>
        <p>등산 경험을 입력해주세요.</p>
      </div>
      <SearchBar />
      <br />
      {/* 리덕스에서 가져온 Exp 리스트 값 매핑해서 props */}
      <ExperienceList />
      <ExperienceList />
      <ExperienceList />
      <ExperienceList />
      <br />
      {btnActivator === 0 ? (
        <UnSubmitBtn>완료</UnSubmitBtn>
      ) : (
        <SubmitBtn>완료</SubmitBtn>
      )}
      {/* redux에 접근해서 난이도가 null값이 아니면 활성화
      onClick에 axios하고, 메인 페이지로 navigate */}
    </div>
  );
}

export default SignUp2;

const SubmitBtn = styled.button`
  width: 50vw;
  height: 20vw;
  border-radius: 20px;
  background-color: #238c47;
  font-size: 12vw;
  color: white;
  margin-top: 10vw;
  float: right;
  margin-right: 10vw;
  margin-bottom: 5vw;
`;

const UnSubmitBtn = styled.button`
  width: 50vw;
  height: 20vw;
  border-radius: 20px;
  background-color: #c8c8c8;
  font-size: 12vw;
  color: white;
  margin-top: 10vw;
  float: right;
  margin-right: 10vw;
  margin-bottom: 5vw;
`;
