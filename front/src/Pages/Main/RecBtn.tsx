import { ReactElement } from "react";
import styled from "styled-components";

interface ButtonInfo extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: string;
  imgsrc?: string;
  imgalt: string;
  onClick: () => void;
}

function RecBtn({
  className,
  children,
  imgsrc,
  imgalt,
  onClick,
  ...rest
}: ButtonInfo): ReactElement {
  return (
    <StyledBtn className={className} onClick={onClick} {...rest}>
      <BtnName>{children}</BtnName>
      <StyledIcon src={imgsrc} alt={imgalt} />
    </StyledBtn>
  );
}

const StyledBtn = styled.button`
  width: 50%;
  padding: 15px;
  padding-left: 10px;
  border: none;
  border-radius: 15px;
  margin: 10px;
  box-shadow: 5px 5px 5px #b7b7b7;
  background-color: #f5f5f5;
`;

const BtnName = styled.p`
  white-space: pre-wrap;
  text-align: left;
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: "GmarketSansMedium";
  font-size: 7vw;
`;

const StyledIcon = styled.img`
  float: right;
  width: 14vw;
  margin-top: 5px;
`;

export default RecBtn;
