import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

import { useSelector } from 'react-redux/es/exports';
import { Exp } from '../../../store/signup2Slice';

function ExperienceList() {

  // const exp = useSelector<Exp>(state => state.exMtNm)
  
  const [easy, setEasy] = useState(0)
  const [soso, setSoso] = useState(0) 
  const [hard, setHard] = useState(0)

  function easyToggle() {
    // if (easy === 0) {
    setEasy(1)
    setSoso(0)
    setHard(0)
    // }
    // redux E
  }
  function sosoToggle() {
    // if (soso === 0) {
    setSoso(1)
    setEasy(0)
    setHard(0)
    // }
    // redux N
  }
  function hardToggle() {
    // if (hard === 0) {
    setHard(1)
    setSoso(0)
    setEasy(0)
    // }
    // redux H
  }

  

  const diffcheck = [easy, soso, hard]
  // 난이도 (쉬움/보통/어려움) (체크 안됨 : 0 / 체크됨 : 1)을 정리한 리스트
  // 리덕스를 통해 해당 리스트가 store에서 지속적으로 갱신되도록 해야함
  // 해당 리스트에 1이 없으면 완료 버튼이 비활성화 되도록 해야함

  return(
      // 여기에 등산경험 입력 결과
    <ExpListDiv>
      <DelBtnDiv>
        <DelBtn>X</DelBtn>
      </DelBtnDiv>
      <MtNameDiv>
        <MtName>아차산</MtName>
      </MtNameDiv>
      { easy === 0 ?
        <DiffBtn onClick={easyToggle}>쉬움</DiffBtn> :      
        <ClickedDiffBtn>쉬움</ClickedDiffBtn>
      }
      { soso === 0 ?
        <DiffBtn onClick={sosoToggle}>보통</DiffBtn> :      
        <ClickedDiffBtn>보통</ClickedDiffBtn>
      }
      { hard === 0 ?
        <DiffBtn onClick={hardToggle}>어려움</DiffBtn> :      
        <ClickedDiffBtn>어려움</ClickedDiffBtn>
      }
    </ExpListDiv>
  )
}
export default ExperienceList

const ExpListDiv = styled.div`
  width : 100vw;
  height : 12vw;
  margin-top: 8vw;
  display: flex;
  justify-content: space-evenly
  `

const DelBtnDiv = styled.div`
  width: 7vw;
  height: 12vw;
  display : flex;
  align-items : center;
`

const DelBtn = styled.button`
  width: 7vw;
  height: 7vw;
  font-size: 4vw;
  background-color : white;
  &: hover{
    cursor : pointer;
`

const MtNameDiv = styled.div`
  width: 30vw;
  height: 12vw;
  display : flex;
  align-items : center;
  margin-right : 2vw;
`

const MtName = styled.a`
  width: 30vw;
  font-size: 7vw;
  font-weight: bold;
  color : black;
  text-decoration : none;
`

const DiffBtn = styled.button`
  width: 18vw;
  height: 12vw;
  font-size: 4vw;
  font-weight: bold;
  color : #C8C8C8;
  background-color : white;
  border-radius : 25px;
  border : 1vw;
  border-style : solid;
  border-color : #C8C8C8;
  &: hover{
    cursor : pointer;
`

const ClickedDiffBtn = styled.button`
  width: 18vw;
  height: 12vw;
  font-size: 4vw;
  background-color : white;
  border-radius : 20px;
  font-weight: bold;
  color : #238C47;
  border : 1vw;
  border-color: #238C47;
  border-style : solid;
  &: hover{
    cursor : pointer;
`