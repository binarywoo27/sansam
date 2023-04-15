import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { history } from "./history";

function CameraApp() {
  // accessToken, refreshToken 세션스토리지에서 가져와주기
  const accessToken = sessionStorage.getItem("accessToken");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string>("");
  const [cameraState, setCameraState] = useState(0);
  const navigate = useNavigate();

  const moveToHiking = () => {
    navigate("/hiking");
  };

  // // 1번째 방법
  useEffect(() => {
    if (accessToken) {
      startCamera();
    } else {
      navigate("/");
      window.alert("로그인이 필요한 페이지입니다.");
    }
  }, []);

  useEffect(() => {
    // const listenBackEvent = () => {
    //   stopCamera();
    //   console.log("카메라 꺼지나? ");
    // };
    const unlistenHistoryEvent = history.listen(async ({ action }) => {
      if (action === "POP") {
        // await listenBackEvent();
        await stopCamera();
        // window.confirm("사진 촬영을 종료하시겠습니까?");
      }
    });
    return unlistenHistoryEvent;
  }, []);

  // 2번째 방법
  // useEffect(() => {
  //   startCamera();

  //   let unlisten = history.listen(async (location) => {
  //     if (history.action === "PUSH") {
  //     }
  //     if (history.action === "POP") {
  //       await stopCamera();
  //     }
  //   });

  //   return () => {
  //     unlisten();
  //   };
  // }, [history]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      // console.log(cameraStream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = async () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    moveToHiking();
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL();
        // setImageDataUrl(dataUrl);
        const downloadLink = document.createElement("a");
        downloadLink.href = dataUrl;
        downloadLink.download = "image.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  return (
    <StyledDiv>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width={360}
        height={300}
      ></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {/* {cameraStream ? (
        <button onClick={stopCamera}>카메라 끄기</button>
      ) : (
        <button onClick={startCamera}>Start Camera</button>
      )} */}
      {/* <button onClick={captureImage}>Capture Image</button> */}
      <StyledCircle onClick={captureImage}>
        <img src={"/img/camera.png"} alt="camera btn" width={"80%"} />
      </StyledCircle>
      {/* {imageDataUrl && (
        <StyledButton onClick={downloadImage}>이미지 다운</StyledButton>
      )} */}
      <StyledButton2 onClick={stopCamera}>카메라 끄기</StyledButton2>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  padding-top: 20%;
`;

const StyledCircle = styled.div`
  padding-top: 4%;
  text-align: center;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  margin-left: 40%;
  margin-right: 12%;
  margin-top: 10%;
  border: 3.5px solid #119426;
`;

const StyledButton = styled.button`
  margin-left: 30%;
  margin-top: 5%;
  background-color: #238c47;
  width: 40vw;
  height: 5vh;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
`;

const StyledButton2 = styled.button`
  margin-left: 30%;
  margin-top: 8%;
  background-color: #ff1900d8;
  width: 40vw;
  height: 5vh;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
  font-family: "GmarketSansLight";
`;

export default CameraApp;
