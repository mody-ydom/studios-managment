import React from "react";
import { Button, ButtonProps, buttonClasses } from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(Button)`
  border-radius: 20px;
  box-shadow: 0px 4px 19px 0px #7793414d;
  /* width: 100%; */
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  padding: 12px 30px;
box-shadow: none;
  &.${buttonClasses.contained} {
    background: #1eabe3;
  }
  &.${buttonClasses.outlined} {
    border: 2px solid #1eabe3;
    background-color: transparent;
    color: #1eabe3;
    transition: background-color 300ms, color 300ms
    &:hover{
      background-color: #1eabe3;
    color: #fff;
      
    }
  }
`;

console.log(buttonClasses);

const CustomButton: React.FC<ButtonProps> = ({ ...props }) => {
  return <StyledButton {...props} />;
};

export default CustomButton;
