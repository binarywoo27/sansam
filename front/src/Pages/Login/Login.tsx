import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  // navigation기능 사용을 위해 navigate 선언
  const navigate = useNavigate();

  // 주소값(localhost:3000/login?accessToken='코드'?refreshToken='코드') 받아오기 위해 useLocation 사용
  const location = useLocation();
  const Token = location.search.split("?");
  const accessToken = Token[1];
  const refreshToken = Token[2];

  // 렌더링 되자마자 accessToken, refreshToken 세션 스토리지에 저장 후 메인페이지로 이동
  useEffect(() => {
    if (accessToken && refreshToken) {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      navigate("/main");
    }
  }, []);

  return (
    <div className="Login">
      <h1>Login</h1>
    </div>
  );
}

export default Login;
