import styled from "styled-components";

function Loading() {
  return (
    <StyledDiv>
      <StyledP>조금만 기다려주세요 :)</StyledP>
      <StyledImg src="/img/green_spinner.gif" alt="로딩중" />
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  margin-top: 150px;
  margin-left: 80px;
`;

const StyledImg = styled.img`
  margin-left: 15px;
`;

const StyledP = styled.p`
  /* margin-left: x; */
  font-family: "GmarketSansMedium";
  font-size: 20px;
  margin-bottom: 5px;
`;

export default Loading;
