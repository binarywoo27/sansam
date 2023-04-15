import styled from "styled-components";
import { useState } from "react";
import axios from "../../store/baseURL";

interface reviewInfo {
  reviewNo?: number;
  reviewerNicknm?: string;
  reviewDate?: Date;
  reviewTime?: number;
  reviewContent?: string;
  reviewRelDiff?: string;
  userNickname: string;
  id: string;
}

function ReviewItem({
  reviewNo,
  reviewerNicknm,
  reviewDate,
  reviewTime,
  reviewContent,
  reviewRelDiff,
  userNickname,
  id,
}: reviewInfo) {
  // 수정 여부 flag
  const [revised, setRevised] = useState<boolean>(false);

  // 삭제 여부 flag'
  const [deleted, setDeleted] = useState<boolean>(false);

  // 수정된 리뷰 내용
  const [newData, setNewData] = useState<string | undefined>(reviewContent);

  // 수정 버튼 클릭
  const changeData = () => {
    setRevised(!revised);
  };

  // 수정하기 => 수정 취소 버튼 클릭
  const notRevised = () => {
    setRevised(!revised);
  };

  // access token, refresh token 가져오기
  const AccessToken = sessionStorage.getItem("accessToken");
  const RefreshToken = sessionStorage.getItem("refreshToken");

  // 수정하기 => 수정하기 버튼 클릭
  const changeReview = (event: any) => {
    setNewData(event.target.value);
  };

  const sendData = () => {
    axios
      .put(
        `/user/review/update/${reviewNo}`,
        {
          reviewRelDiff: reviewRelDiff,
          reviewContent: newData,
        },
        {
          headers: {
            "X-ACCESS-TOKEN": AccessToken,
            "X-REFRESH-TOKEN": RefreshToken,
          },
        }
      )
      .then(res => {
        // 세션스토리지 내 accessToken 갱신
        sessionStorage.setItem("accessToken", res.headers["x-access-token"]);
      })
      .catch(err => {
        console.log(err);
      });
    setRevised(!revised);
  };

  // 삭제 버튼 클릭
  const deleteData = () => {
    axios
      .delete(`/user/review/delete/${reviewNo}`, {
        headers: {
          "X-ACCESS-TOKEN": AccessToken,
          "X-REFRESH-TOKEN": RefreshToken,
        },
        data: {
          courseNo: id,
        },
      })
      .then(res => {
        // 세션스토리지 내 accessToken 갱신
        sessionStorage.setItem("accessToken", res.headers["x-access-token"]);
      })
      .catch(err => {
        console.log(err);
      });
    setDeleted(true);
  };

  return (
    <div>
      {deleted ? null : (
        <StyledDiv>
          <StyledDiv2>
            <StyledP>{reviewerNicknm}</StyledP>
            <br />
            {reviewRelDiff === "E" ? (
              <div>
                <StyledImg src="\img\filled_mt.png" alt="mt" />
                <StyledImg src="\img\unfilled_mt.png" alt="mt" />
                <StyledImg src="\img\unfilled_mt.png" alt="mt" />
              </div>
            ) : reviewRelDiff === "N" ? (
              <div>
                <StyledImg src="\img\filled_mt.png" alt="mt" />
                <StyledImg src="\img\filled_mt.png" alt="mt" />
                <StyledImg src="\img\unfilled_mt.png" alt="mt" />
              </div>
            ) : (
              <div>
                <StyledImg src="\img\filled_mt.png" alt="mt" />
                <StyledImg src="\img\filled_mt.png" alt="mt" />
                <StyledImg src="\img\filled_mt.png" alt="mt" />
              </div>
            )}
          </StyledDiv2>

          {reviewerNicknm === userNickname ? (
            revised ? (
              <StyledDiv3>
                <StyledInputDiv>
                  <StyledInput
                    type="text"
                    value={newData}
                    onChange={changeReview}
                  />
                </StyledInputDiv>
                <div>
                  <StyledButton onClick={sendData}>확인</StyledButton>
                  <StyledButton onClick={notRevised}>취소</StyledButton>
                </div>
              </StyledDiv3>
            ) : (
              <StyledDiv3>
                <StyledP2>{newData}</StyledP2>
                <StyledDiv4>
                  <RevisedImg
                    src="\img\revise.png"
                    alt=""
                    onClick={changeData}
                  />
                  <RevisedImg
                    src="\img\delete.png"
                    alt=""
                    onClick={deleteData}
                  />
                </StyledDiv4>
              </StyledDiv3>
            )
          ) : (
            <StyledDiv3>
              <StyledP2>{reviewContent}</StyledP2>
            </StyledDiv3>
          )}
        </StyledDiv>
      )}
    </div>
  );
}

const StyledDiv = styled.div`
  display: flex;
  width: 92%;
  margin-left: 4%;
  border-radius: 15px;
  background-color: #cfe2c8;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const StyledDiv2 = styled.div`
  width: 25%;
  margin-top: 15px;
  margin-left: 10px;
  padding: 0px;
`;

const StyledP = styled.p`
  display: inline;
  text-align: center;
  font-family: "GmarketSansMedium";
  font-size: large;
  padding-left: 3px;
  padding-right: 0px;
`;

const StyledImg = styled.img`
  width: 23px;
  margin-right: 3px;
  margin-bottom: 15px;
`;

const StyledDiv3 = styled.div`
  width: 70%;
`;

const StyledP2 = styled.p`
  font-family: "GmarketSansLight";
  font-size: 13px;
  margin-left: 5px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const StyledDiv4 = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2%;
`;
const StyledButton = styled.button`
  width: 25%;
  height: 20px;
  font-family: "GmarketSansMedium";
  font-size: small;
  background-color: #408c25;
  color: white;
  border: 0;
  border-radius: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  padding-left: 5px;
  font-family: "GmarketSansLight";
  font-size: 13px;
  width: 95%;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const StyledInputDiv = styled.div`
  margin-left: 10px;
`;

const RevisedImg = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-bottom: 10px;
`;
export default ReviewItem;
