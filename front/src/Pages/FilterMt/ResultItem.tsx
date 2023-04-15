import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ResultInfo {
  COURSE_NO: number;
  COURSE_MT_CD: string;
  COURSE_MT_NM: string;
  COURSE_MT_NO: number;
  COURSE_ELEV_DIFF: number;
  COURSE_UPTIME: number;
  COURSE_DOWNTIME: number;
  COURSE_LENGTH: number;
  COURSE_LOCATION: string;
  COURSE_ADDRESS: string;
  pressSearch: boolean;
}

function ResultItem({
  COURSE_NO,
  COURSE_MT_CD,
  COURSE_MT_NM,
  COURSE_MT_NO,
  COURSE_ELEV_DIFF,
  COURSE_UPTIME,
  COURSE_DOWNTIME,
  COURSE_LENGTH,
  COURSE_LOCATION,
  COURSE_ADDRESS,
  pressSearch,
}: ResultInfo) {
  const navigate = useNavigate();

  // 결과목록에서 코스디테일 페이지로 이동
  const moveToDetail = () => {
    navigate(`/coursedetail/${COURSE_NO}`);
  };

  const [imgName, setImgName] = useState<string>("");
  const imgUrl =
    "https://www.forest.go.kr/images/data/down/mountain/" + imgName;

  useEffect(() => {
    axios
      .get(
        "https://apis.data.go.kr/1400000/service/cultureInfoService2/mntInfoImgOpenAPI2",
        {
          params: {
            mntiListNo: COURSE_MT_CD,
            pageNo: "1",
            numOfRows: "10",
            ServiceKey: "REACT_APP_MT_PHOTO_API_KEY",
          },
        }
      )
      .then((res) => {
        if (res.data.response.body.items) {
          setImgName("");
          setImgName(res.data.response.body.items.item[0].imgfilename);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setImgName("");
  }, [pressSearch]);

  return (
    <StyledDiv onClick={moveToDetail}>
      {imgName ? (
        <StyledImg src={imgUrl} alt={imgName} />
      ) : (
        <StyledImg src="https://san.chosun.com/news/photo/202205/15750_66157_37.jpg" />
      )}
      <StyledDiv2>
        <StyledTitle>
          {COURSE_LOCATION} {COURSE_MT_NM} {COURSE_MT_NO}코스
        </StyledTitle>
        <StyledHr />
        <StyledP>코스 길이 : {COURSE_LENGTH} km</StyledP>
        <StyledP>
          산행 시간 : {Math.floor((COURSE_UPTIME + COURSE_DOWNTIME) / 60)}시간{" "}
          {Math.floor((COURSE_UPTIME + COURSE_DOWNTIME) % 60)}분
        </StyledP>
      </StyledDiv2>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  border: 1px gray solid;
  padding: 5px;
  margin-top: 20px;
  border-radius: 15px;
`;

const StyledDiv2 = styled.div`
  margin-left: 13px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const StyledImg = styled.img`
  width: 110px;
  height: 85px;
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const StyledTitle = styled.p`
  font-family: "GmarketSansLight";
  font-weight: 700;
  font-size: 20px;
  margin: 0;
`;

const StyledP = styled.p`
  font-family: "GmarketSansLight";
  margin: 0;
`;

const StyledHr = styled.hr`
  margin-top: 0;
  margin-bottom: 5px;
  width: 180px;
`;
export default ResultItem;
