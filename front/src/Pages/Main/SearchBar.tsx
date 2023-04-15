import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { courseApi } from "../../api";
import { useNavigate } from "react-router-dom";

// styled-component 내에서 변수 사용하기 위해 타입 지정
interface SearchProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
  isFocus?: boolean;
}

function SearchBar() {
  // accessToken, refreshToken 세션스토리지에서 가져와주기
  const accessToken = sessionStorage.getItem("accessToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const navigate = useNavigate();

  // mtlist(axios로 받아오는 산 이름 값들) useState 세팅
  const [mtList, setMtList] = useState<Array<string>>([""]);

  // SearchBar가 랜더링되면 산목록 axios 받아서 mtlist에 저장
  useEffect(() => {
    const getMtList = async () => {
      const res = await courseApi.searchBar(accessToken, refreshToken);
      setMtList(res.data.mountainList);
    };
    getMtList();
  }, []);

  // keyword(검색창에 입력하는 값) State 세팅
  const [keyword, setKeyword] = useState<string>("");

  // ======================================
  const [result, setResult] = useState<string>("");
  // 검색창 입력값 변할 때마다 입력하는 값을 keyword에 저장
  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value.trim());
  };

  // 자동완성 결과값 State 세팅
  const [resultData, setResultData] = useState<Array<string>>([""]);

  // 검색창에 keyword가 입력될 때 키워드를 포함하고 있는 산들만 filter해주기
  useEffect(() => {
    setResultData(
      mtList.filter(mountain => {
        if (mountain.includes(keyword) && keyword.length !== 0) {
          return mountain.includes(keyword);
        }
        return false;
      })
    );
  }, [keyword]);

  // 검색창 focus 상태 useState 세팅
  const [isFocus, setIsFocus] = useState(false);

  const moveToCourseDetail = (result: string) => {
    navigate("/filtermt", { state: result });
    // console.log(result);
  };

  return (
    <SearchBarDiv>
      <InputDiv>
        <Search
          placeholder="산이름을 입력해주세요"
          value={keyword}
          onChange={onChangeData}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setIsFocus(false);
          }}
          isFocus={isFocus}
        />
      </InputDiv>
      {isFocus && keyword !== "" ? (
        <ResultDiv>
          <ResultUl>
            {resultData.length > 0 && keyword !== "" ? (
              resultData.map((result, index) => (
                <div key={index}>
                  <Resultli
                    onMouseDown={e => {
                      e.preventDefault();
                    }}
                    onClick={() => {
                      // console.log(result);
                      setResult(result);
                      moveToCourseDetail(result);
                      // navigate(`/filtermt/${result}`);
                    }}
                  >
                    {result}
                  </Resultli>
                  <hr />
                </div>
              ))
            ) : (
              <Resultli2>산 이름을 정확히 입력해 주세요.</Resultli2>
            )}
          </ResultUl>
        </ResultDiv>
      ) : null}
    </SearchBarDiv>
  );
}

const SearchBarDiv = styled.div`
  padding-left: 7vw;
  padding-right: 7vw;
  margin-bottom: 3vw;
`;

const InputDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 8vw;
    height: 8vw;
    position: relative;
    right: 11vw;
  }
`;

const Search = styled.input<SearchProps>`
  width: 100%;
  height: 11vw;
  border: 1px solid gray;
  border-radius: ${props =>
    props.isFocus && props.value ? "10px 10px 0px 0px" : "10px 10px"};
  font-family: "GmarketSansLight";
  text-align: left;
  font-size: 5vw;
  padding-top: 3px;
  padding-left: 8px;
  :focus {
    outline: 2px solid #238c47;
  }
`;

const ResultDiv = styled.div`
  margin-top: 2px;
  position: absolute;
  z-index: 999;
  background-color: white;
  width: 86%;
  max-height: 43vh;
  /* height: 11vw; */
  border: 1px solid gray;
  border-top: none;
  border-radius: 0px 0px 10px 10px;
  padding-left: 3vw;
  padding-right: 3vw;
  padding-bottom: 2vw;
  padding-top: 1vw;
  /* box-shadow: 0 0 10px #ddd; */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    height: 20%;
    background: #ddd;
    border-radius: 20px;
  }
`;

const ResultUl = styled.ul`
  margin: 0px;
  padding-left: 0px;
`;

const Resultli = styled.li`
  height: 5vw;
  list-style-type: none;
  font-family: "GmarketSansLight";
  font-size: 5vw;
  /* padding-top: 1vw;
  padding-bottom: 1vw; */
  margin-top: 3vw;
  margin-bottom: 3vw;
`;

const Resultli2 = styled.li`
  height: 5vw;
  list-style-type: none;
  font-family: "GmarketSansLight";
  font-size: 5vw;
  padding-top: 2vw;
  line-height: 25px;
  margin-bottom: 4vw;
`;

export default SearchBar;
