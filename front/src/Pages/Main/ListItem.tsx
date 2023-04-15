import styled from "styled-components";
import { RecInfo } from "../../store/RecommendSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/effect-cards";
import ListCard from "./ListCard";

function ListItem({
  courseName,
  USER_AGE_POOL,
  USER_GENDER,
  COURSE_LIST,
}: RecInfo) {
  return (
    <div className="ListItem">
      {USER_AGE_POOL && USER_GENDER ? (
        <StyledH>
          {USER_AGE_POOL}대{" "}
          {USER_GENDER === "F" ? <span>여성</span> : <span>남성</span>}분들이
          선호하는 코스
        </StyledH>
      ) : (
        <StyledH>{courseName}</StyledH>
      )}
      <Swiper
        modules={[FreeMode]}
        spaceBetween={8}
        slidesPerView={2.7}
        loop={true}
        freeMode={true}
      >
        {COURSE_LIST.map((course, index) => (
          <StyledSlide key={index}>
            <ListCard
              COURSE_MT_NM={course.COURSE_MT_NM}
              COURSE_MT_NO={course.COURSE_MT_NO}
              COURSE_MT_CD={course.COURSE_MT_CD}
              COURSE_NO={course.COURSE_NO}
              COURSE_LOCATION={course.COURSE_LOCATION}
            />
          </StyledSlide>
        ))}
      </Swiper>
      <hr />
    </div>
  );
}

const StyledH = styled.p`
  font-family: "GmarketSansLight";
  font-weight: bold;
  font-size: 4.3vw;
  text-align: left;
  margin-bottom: 5px;
`;

const StyledSlide = styled(SwiperSlide)`
  width: 30vw;
  /* background-color: #f0f5ee; */
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  margin-bottom: 3vw;
`;

export default ListItem;
