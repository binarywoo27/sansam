import styled from "styled-components";

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  soso: boolean;
}

function StyledButtonSoso({ onClick, soso }: Props) {
  return (
    <StyledDiv>
      {soso === false ? (
        <StyledInnerDiv>
          <img
            src={"/img/mtnNormalEmpty.png"}
            alt="soso button"
            width={"80%"}
            onClick={onClick}
          />
        </StyledInnerDiv>
      ) : (
        <StyledInnerDiv>
          <img
            src={"/img/mtnNormalFull.png"}
            alt="soso button"
            width={"80%"}
            onClick={onClick}
          />
        </StyledInnerDiv>
      )}
      <StyledText>보통</StyledText>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  /* padding-left: 10%; */
`;

const StyledInnerDiv = styled.div`
  /* padding-top: 10%; */
  text-align: center;
`;

const StyledText = styled.div`
  font-family: "GmarketSansLight";
  text-align: center;
  color: #838383;
`;

export default StyledButtonSoso;
