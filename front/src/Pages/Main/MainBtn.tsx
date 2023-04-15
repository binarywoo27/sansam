import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RecBtn from "./RecBtn";

function MainBtn() {
  const navigate = useNavigate();
  return (
    <div>
      <RecommendBtn>
        <RecBtn
          children="산으로            추천받기"
          className="MtBtn"
          imgsrc={process.env.PUBLIC_URL + "img/mountain.png"}
          imgalt="mountain"
          onClick={() => {
            navigate("/filtermt");
          }}
        />
        <RecBtn
          children="지역으로    추천받기"
          className="RgBtn"
          imgsrc={process.env.PUBLIC_URL + "img/map.png"}
          imgalt="map"
          onClick={() => {
            navigate("/filterrg");
          }}
        />
      </RecommendBtn>
    </div>
  );
}

const RecommendBtn = styled.div`
  display: flex;
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 3vw;
`;

export default MainBtn;
