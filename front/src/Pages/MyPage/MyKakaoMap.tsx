import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mtInfo } from "./MyMap";

function MyKakaoMap(props: { ExpMtInfo: mtInfo[] }) {
  const navigate = useNavigate();
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(36.3039, 127.8212), // 지도의 중심좌표
      level: 13,
    };
    const map = new window.kakao.maps.Map(container, options);

    let imageSrc = "/img/flag_red.png",
      imageSize = new window.kakao.maps.Size(30, 35),
      imageOption = { offset: new window.kakao.maps.Point(27, 69) };
    let markerImage = new window.kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    props.ExpMtInfo.forEach(info => {
      const maker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(
          info.courseXCoords,
          info.courseYCoords
        ),
        image: markerImage,
        clickable: true,
      });
      window.kakao.maps.event.addListener(maker, "click", function () {
        navigate(`/coursedetail/${info.courseNo}`);
      });
    });
  }, [props.ExpMtInfo]);

  return <StyledMap id="map" />;
}

const StyledMap = styled.div`
  margin-top: 10px;
  width: 90vw;
  /* height: 150vw; */
  height: 100%;
  border-radius: 5px;
`;
export default MyKakaoMap;
