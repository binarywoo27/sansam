import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";

function NotFound() {
  // navigate 사용 정의
  const navigate = useNavigate();

  // accessToken 세션스토리지에서 가져와주기
  const accessToken = sessionStorage.getItem("accessToken");

  const moveToMain = () => {
    navigate("/main");
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
      window.alert("로그인이 필요한 페이지입니다.");
    }
  });

  return (
    <div>
      <StyledP>잘못된 페이지입니다.</StyledP>
      <StyledImg src="\img\tthan_san.png" alt="tthan_san" />

      <StyledDiv>
        <StyledImg2 src="\img\crying.png" alt="crying" />
        <StyledP2>이 산이 아닌가벼...</StyledP2>
      </StyledDiv>

      <StyledButton onClick={moveToMain}>돌아가기</StyledButton>
    </div>
  );
}

const StyledP = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 180px;
  margin-bottom: 20px;
  font-family: "GmarketSansMedium";
  font-size: 30px;
`;

const StyledImg = styled.img`
  width: 70%;
  margin-left: 15%;
  border-radius: 5px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const StyledP2 = styled.p`
  font-family: "EF_jejudoldam";
  display: inline-block;
  justify-content: center;
  font-size: 25px;
  margin-top: 20px;
`;

const StyledImg2 = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 5px;
`;

const StyledButton = styled.button`
  width: 120px;
  height: 50px;
  font-family: "GmarketSansMedium";
  font-size: 20px;
  background-color: #248c48;
  color: white;
  border: none;
  border-radius: 5px;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-left: 120px;
  margin-top: 40px;
`;
export default NotFound;
