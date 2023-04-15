import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../../store/baseURL";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addExp } from "../../../store/signup2Slice";

import stringSimilarity from "string-similarity";
// import { Komoran } from 'koalanlp/API';

// interface SearchDatas {
//   mountain: string;
// }

// interface MtList {
//   mountain: string;
// }

function SearchBar() {
  // mtlist(axios로 받아오는 산 이름 값) useState 세팅
  type MtList = [string] | [];
  const [mtlist, setMtlist] = useState<MtList>([""]);

  // SearchBar가 랜더링되면 산목록 axios 받아서 mtlist에 저장
  function getMtList() {
    const AccessToken = sessionStorage.getItem("accessToken");
    const RefreshToken = sessionStorage.getItem("refreshToken");
    console.log(AccessToken, RefreshToken);

    axios
      .get("/course/mtlist", {
        headers: {
          "X-ACCESS-TOKEN": AccessToken,
          "X-REFRESH-TOKEN": RefreshToken,
        },
      })

      .then((res) => {
        console.log("산목록 받기 성공");
        console.log(res.data.mountainList);
        setMtlist(res.data.mountainList);
        console.log(mtlist);
      })
      .catch((err) => console.log("errror"));
  }
  useEffect(() => {
    getMtList();
  }, []);

  // keyword(검색창에 입력하는 값) useState 세팅
  const [keyword, setKeyword] = useState<string>("");

  // 검색창 입력값 변할 때마다 입력하는 값을 keyword useState에 저장
  const onChangeData = (e: React.FormEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value.trim());
    console.log(keyword);
  };

  // keyItem(알고리즘 돌린 결과값) useState 세팅
  type SearchDatas = [string] | [];
  const initialSearchData: SearchDatas = [""];
  const [keyItems, setKeyItems] = useState<SearchDatas>(initialSearchData);

  // 자동완성을 위한 유사도 검사 알고리즘
  function AutoSearchAlgo() {
    type MatchData = [string];
    const matches: MatchData = [""];
    mtlist.forEach((mt) => {
      const similarity = stringSimilarity.compareTwoStrings(mt, keyword);
      if (similarity > 0.5) {
        // adjust this threshold value as needed
        matches.push(mt);
      }
    });
    setKeyItems(matches);
    console.log(keyItems);
  }
  // 검색창에 keyword가 입력될 때 유사도 검사 알고리즘이 작동, 자연스러운 작동위해 딜레이를 줌
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) AutoSearchAlgo();
    }, 100);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  // 자동완성에 뜬 산이름을 클릭할 경우 발생하는 클릭이벤트
  const dispatch = useAppDispatch();
  const expmt = useAppSelector((state) => state.signup2);
  function AutoSearchClick(mtname: string) {
    // ()
    dispatch(addExp({ exMtNm: mtname, exDiff: "" }));
  }

  return (
    <div>
      <SearchBarDiv>
        <Search
          placeholder="산이름을 입력해주세요"
          value={keyword}
          onChange={onChangeData}
        />
        {/* <SearchBtn>검 색</SearchBtn> */}

        {/* 이거 돋보기 버튼이야 선영아 */}
        {/* <img src="/dotbogi.png" alt="dotbogi" /> */}
        {/* styled div 안에 img로 css 수정할 수 있음 */}
      </SearchBarDiv>

      {/* 검색 키워드가 있어야 자동완성창을 보여줌 */}
      {keyword[1] ? (
        <AutoSearchDiv>
          <AutoSearchUl>
            {keyItems.slice(1, 6).map((mtname) => (
              <AutoSearchLi
                key={mtname}
                // value={mtname}
                onClick={() => AutoSearchClick(mtname)}
              >
                {mtname}
              </AutoSearchLi>
            ))}
          </AutoSearchUl>
        </AutoSearchDiv>
      ) : null}
    </div>
  );
  // return(
  //   <div className='SearchBarDiv'>
  //       <input className='SearchBar' type="text" name="" id="" placeholder=' 산 이름을 입력해주세요' /><button className='SearchBarBtn'>입 력</button>
  //   </div>
  // )
}
export default SearchBar;

const SearchBarDiv = styled.div`
  width: 100vw;
  height: 7vh;
  margin-top: 7vh;
  margin-bottom: 0.7vh;
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

const Search = styled.input`
  width: 80vw;
  height: 18vw;
  border-radius: 20px;
  font-family: "GmarketSansMedium";
  text-align: center;
  font-size: 7.5vw;
`;

const ClickedSearch = styled.input`
  width: 80vw;
  height: 18vw;
  border-radius: 20px;
  font-family: "GmarketSansMedium";
  font-size: 7vw;
  margin-left: 7vw;
  border: solid #238c47 1.5vw;
`;

const AutoSearchDiv = styled.div`
  width: 80vw;
  height: 80vw;
  background-color: #ffffff;
  border: solid black 0.4vw;
  position: absolute;
  margin-left: 10vw;
  border-radius: 10px;
`;

const AutoSearchUl = styled.ul`
  padding-left: 0vw;
  padding-top: 2vw;
`;

const AutoSearchLi = styled.li`
  list-style-type: none;
  font-size: 6vw;
  font-weight: bold;
  padding-bottom: 3vw;
  height: 13vw;
  padding-top: 3vw;
  border-radius: 10px;
`;

// const SearchBtn = styled.button`
//   width: 20vw;
//   height: 11vw;
//   font-size: 5vw;
//   border-radius: 5%;
//   background-color: #238C47;
//   color : white;
//   font-family: "GmarketSansMedium";
// `
