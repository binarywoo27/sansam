import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import axios from "../../store/baseURL";

interface Option {
  value: string;
  label: string;
}

const locations: Option[] = [
  { value: "서울", label: "서울시" },
  { value: "부산", label: "부산시" },
  { value: "대구", label: "대구시" },
  { value: "인천", label: "인천시" },
  { value: "광주", label: "광주시" },
  { value: "대전", label: "대전시" },
  { value: "울산", label: "울산시" },
  { value: "세종", label: "세종시" },
  { value: "경기", label: "경기도" },
  { value: "강원", label: "강원도" },
  { value: "충북", label: "충청북도" },
  { value: "충남", label: "충청남도" },
  { value: "전북", label: "전라북도" },
  { value: "전남", label: "전라남도" },
  { value: "경북", label: "경상북도" },
  { value: "경남", label: "경상남도" },
  { value: "제주", label: "제주도" },
];

const genders: Option[] = [
  { value: "M", label: "성별: 남" },
  { value: "F", label: "성별: 여" },
];

function SignUp1() {
  const navigate = useNavigate();
  const nickNmRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  // 컴포넌트 mount시에 url에서 no 값 받아오기.
  useEffect(() => {
    // userNo 주소에서 받아오기
    const userNo = Number(searchParams.get("no"));

    setSignUp({
      ...signUp,
      userNo: userNo,
    });
  }, []);

  useEffect(() => {
    if (nickNmRef.current?.value !== "") {
      nickNmRef.current!.style.borderColor = "black";
    }
    if (ageRef.current?.value !== "") {
      ageRef.current!.style.borderColor = "black";
    }
  }, [nickNmRef.current?.value, ageRef.current?.value]);

  const moveToMain = () => {
    navigate("/main/");
  };

  const [signUp, setSignUp] = useState({
    userNo: 0,
    userNicknm: "",
    userAge: "",
    userGender: "M",
    userLocation: "서울시",
  });

  const changeSignUp = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: any
  ) => {
    setSignUp({
      ...signUp,
      [type]: event.target.value,
    });
  };

  // select 태그를 위해 onChange함수를 따로 생성함.
  const handleSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    type: any
  ) => {
    setSignUp({
      ...signUp,
      [type]: event.target.value,
    });
  };

  const apiSignUp1 = () => {
    if (signUp.userNicknm !== "" && signUp.userAge !== "") {
      axios
        .post("/user/signup", {
          userNo: signUp.userNo,
          userNicknm: signUp.userNicknm,
          userAge: Number(signUp.userAge),
          userGender: signUp.userGender,
          userLocation: signUp.userLocation,
        })
        .then((response) => {
          console.log("success");
          if (response.data) {
            sessionStorage.setItem("accessToken", response.data.accessToken);
            sessionStorage.setItem("refreshToken", response.data.refreshToken);
            moveToMain();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (signUp.userNicknm === "") {
      nickNmRef.current!.style.border = "2px solid red";
      // alert("별명을 입력해주세요!");
    } else {
      nickNmRef.current!.style.border = "1px solid black";
      ageRef.current!.style.border = "2px solid red";
      // alert("나이를 입력해주세요!");
    }
  };

  return (
    <StyledDiv>
      <StyledH1>고객님의 정보를 입력해주세요</StyledH1>
      <StyledSpace></StyledSpace>
      <StyledDiv2>
        <StyledInput
          type="text"
          value={signUp.userNicknm}
          onChange={(event) => {
            changeSignUp(event, "userNicknm");
          }}
          placeholder="별명"
          ref={nickNmRef}
        />
      </StyledDiv2>
      <StyledErr>별명을 입력해주세요</StyledErr>
      <StyledDiv2>
        <StyledInput
          type="number"
          value={signUp.userAge}
          onChange={(event) => {
            changeSignUp(event, "userAge");
          }}
          placeholder="나이"
          ref={ageRef}
        />
      </StyledDiv2>
      <StyledDiv2>
        <StyledSelect
          placeholder="성별"
          onChange={(event) => handleSelect(event, "userGender")}
        >
          {genders.map((gender) => (
            <StyledOption value={gender.value} key={gender.value}>
              {gender.label}
            </StyledOption>
          ))}
        </StyledSelect>
      </StyledDiv2>
      <StyledDiv2>
        <StyledSelect onChange={(event) => handleSelect(event, "userLocation")}>
          {locations.map((location) => (
            <StyledOption value={location.value} key={location.value}>
              {location.label}
            </StyledOption>
          ))}
        </StyledSelect>
      </StyledDiv2>
      <StyledButton onClick={apiSignUp1}>완료</StyledButton>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding-top: 30%;
  font-family: "GmarketSansLight";
`;

const StyledH1 = styled.div`
  text-align: center;
  /* padding: 4vw; */
  font-size: 2.5vh;
  font-weight: bold;
`;

const StyledSpace = styled.div`
  margin-top: 10%;
`;

const StyledDiv2 = styled.div`
  margin-bottom: 4%;
  text-align: center;
`;

const StyledInput = styled.input`
  ::placeholder,
  ::-webkit-input-placeholder {
    color: black;
  }
  width: 75vw;
  height: 5vh;
  padding: 12px 12px;
  border-radius: 5px;
  border: 1px solid black;
`;

const StyledErr = styled.div`
  /* visibility: none; */
  display: none;
  color: red;
  font-family: "GmarketSansLight";
`;

const StyledSelect = styled.select`
  width: 75vw;
  height: 5vh;
  border: 1px solid black;
  border-radius: 5px;
  overflow-y: auto;
`;

const StyledOption = styled.option`
  /* overflow-y: scroll; */
`;

const StyledButton = styled.button`
  float: right;
  font-weight: 600;
  width: 35vw;
  height: 6vh;
  color: white;
  background-color: #238c47;
  font-size: 5vw;
  margin-top: 30%;
  margin-right: 15vw;
  padding: 10px;
  cursor: pointer;
  border: none;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
`;

export default SignUp1;
