import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { courseActions } from "../../store/courseSlice";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Icoords {
  courseXCoords: number[];
  courseYCoords: number[];
}

const { kakao } = window;

function Kakaomap({ courseXCoords, courseYCoords }: Icoords) {
  const dispatch = useAppDispatch();
  const [courseMap, setCourseMap] = useState<any>();

  useEffect(() => {
    const length = courseXCoords.length;

    var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스

    var options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(courseXCoords[0], courseYCoords[0]), //지도의 중심좌표.
      level: 8, //지도의 레벨(확대, 축소 정도)
    };

    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 선을 그릴 좌표들
    const drawingLines = (
      courseXCoords: number[],
      courseYCoords: number[],
      length: number
    ) => {
      var linePath = [];
      for (let i = 0; i < length; i++) {
        linePath.push(
          new kakao.maps.LatLng(courseXCoords[i], courseYCoords[i])
        );

        var polyline = new kakao.maps.Polyline({
          path: linePath, // 선을 구성하는 좌표배열
          strokeWeight: 5, // 선의 두께
          strokeColor: "#e72a00", // 선의 색깔
          strokeOpacity: 0.7, // 선의 불투명도 (1에서 0 사이의 값이며 0에 가까울수록 투명)
          strokeStyle: "solid", // 선의 스타일
        });

        polyline.setMap(map);
        const courseMap = polyline.getMap();
        setCourseMap(courseMap);
      }
    };

    drawingLines(courseXCoords, courseYCoords, length);
  }, []);

  useEffect(() => {
    dispatch(courseActions.addCourseMap(courseMap));
  }, [courseMap]);

  return <StyledMap id="map" />;
}

const StyledMap = styled.div`
  margin-left: 10%;
  margin-top: 10px;
  width: 80%;
  height: 200px;
  border-radius: 5px;
  /* z-index: -1; */
`;
export default Kakaomap;
