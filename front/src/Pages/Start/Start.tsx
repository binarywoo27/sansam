import styled from "styled-components";
import { Login_URI } from "../../store/baseURL";

const Start = () => {
  const KAKAO_AUTH_URL = `${Login_URI}/oauth2/authorization/kakao`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <StyledDiv>
      <StyledImg src="/img/main_gif.gif" alt="메인" />
      <StyledDiv2>
        <img
          src="img/kakao_login_medium_narrow.png"
          alt="login"
          onClick={handleLogin}
        />
      </StyledDiv2>
      <StyledImg2 src="/img/start_footer.png" alt="footer" />
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  position: relative;
  width: 100%;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 650px;
`;

const StyledImg2 = styled.img`
  width:100%
`

const StyledDiv2 = styled.div`
  position: fixed;
  top: 500px;
  left: 85px;
`;
export default Start;
