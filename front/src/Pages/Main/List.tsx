import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import { RecInfo } from "../../store/RecommendSlice";
import { DiffInfo } from "../../store/RecommendSlice";
import ListItem from "./ListItem";
import { UserInfo } from "../../store/loginSlice";
import { courseInfo } from "../../store/courseSlice";
import ListItemTopTen from "./ListItemTopTen";

function List() {
  // store에 저장된 각 코스정보를 useSelector로 받아온다!
  const ageGender: RecInfo = useAppSelector(state => state.recommend.genderAge);
  const courses: DiffInfo = useAppSelector(
    state => state.recommend.difficultyCourse
  );
  const topTen: courseInfo[] = useAppSelector(state => state.recommend.topTen);

  // store에 저장된 유저정보를 useSelector로 받아오기
  const userInfo: UserInfo = useAppSelector(state => state.login.userInfo);

  // store에 저장된 난이도별 코스 추천 가능 여부 받아오기
  const isRec: boolean = useAppSelector(state => state.login.isRec);

  return (
    <StyledDiv className="List">
      <StyledH>
        <StyledIcon src="/img/mt_s.png" alt="mountain" /> {userInfo.userNicknm}
        님을 위한 추천코스 <StyledIcon src="/img/mt_s.png" alt="mountain" />
      </StyledH>
      <ListItem
        USER_AGE_POOL={ageGender.USER_AGE_POOL}
        USER_GENDER={ageGender.USER_GENDER}
        COURSE_LIST={ageGender.COURSE_LIST}
      />
      {isRec ? (
        <div>
          <ListItem
            COURSE_LIST={courses.EASY_COURSE_LIST}
            courseName="당신에게 쉬운 코스"
          />
          <ListItem
            COURSE_LIST={courses.NORMAL_COURSE_LIST}
            courseName="적당히 힘든 코스"
          />
          <ListItem
            COURSE_LIST={courses.HARD_COURSE_LIST}
            courseName="도전! 어려운 코스"
          />
        </div>
      ) : (
        <div>
          <ListItemTopTen courseName="TOP10" COURSE_LIST={topTen} />
        </div>
      )}
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledIcon = styled.img`
  width: 20px;
  margin-top: -5px;
`;

const StyledH = styled.p`
  text-align: center;
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 5.1vw;
  margin-bottom: 6vw;
  margin-top: 6vw;
`;

export default List;
