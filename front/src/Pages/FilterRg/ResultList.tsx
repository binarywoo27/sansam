import ResultItem from "./ResultItem";
import styled from "styled-components";

interface courseInfo {
  courseList: any[];
}

function ResultList({ courseList }: courseInfo) {
  return (
    <StyledDiv>
      {courseList.map((data, index) => {
        return (
          <ResultItem
            key={index}
            COURSE_NO={data.COURSE_NO}
            COURSE_MT_CD={data.COURSE_MT_CD}
            COURSE_MT_NM={data.COURSE_MT_NM}
            COURSE_MT_NO={data.COURSE_MT_NO}
            COURSE_ELEV_DIFF={data.COURSE_ELEV_DIFF}
            COURSE_UPTIME={data.COURSE_UPTIME}
            COURSE_DOWNTIME={data.COURSE_DOWNTIME}
            COURSE_LENGTH={data.COURSE_LENGTH}
            COURSE_LOCATION={data.COURSE_LOCATION}
            COURSE_ADDRESS={data.COURSE_ADDRESS}
          />
        );
      })}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  width: 90%;
  margin-left: 5%;
  margin-right: 5%;
`;
export default ResultList;
