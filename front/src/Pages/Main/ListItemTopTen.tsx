import styled from "styled-components";
import { useAppSelector } from "../../store/hooks";
import { courseInfo } from "../../store/courseSlice";
// import { RecInfo } from "../../store/RecommendSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import ListCard from "./ListCard";

interface RecInfo {
  courseName: string;
  COURSE_LIST: courseInfo[];
}

function ListItemTopTen({ courseName, COURSE_LIST }: RecInfo) {
  // store에 저장된 난이도별 코스 추천 가능 여부 받아오기
  const isRec: boolean = useAppSelector(state => state.login.isRec);

  return (
    <div className="ListItemTopTen">
      <StyledH>{courseName}</StyledH>
      <StyledSwiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards, Navigation]}
        loop={true}
        navigation={true}
      >
        {COURSE_LIST.map((course, index) => (
          <StyledSlide key={index}>
            <ListCard
              COURSE_MT_NM={course.courseMtNm}
              COURSE_MT_NO={course.courseMtNo}
              COURSE_MT_CD={course.courseMtCd}
              COURSE_NO={course.courseNo}
              courseIdx={index + 1}
            />
          </StyledSlide>
        ))}
      </StyledSwiper>
    </div>
  );
}

const StyledH = styled.p`
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 5vw;
  text-align: center;
  margin-bottom: 10px;
`;

const StyledSwiper = styled(Swiper)`
  padding-left: 20vw;
  padding-right: 20vw;
`;

const StyledSlide = styled(SwiperSlide)`
  width: 30vw;
  height: 60vw;
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  margin-bottom: 3vw;
`;

export default ListItemTopTen;
