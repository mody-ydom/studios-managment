import {inter} from "@/src/theme";
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";

type ISNavLink ={isActive?:boolean};

const Bronze = (props) => css`
  font-family: ${inter.style.fontFamily};
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  transition: color 300ms;
  
  color:${props.isActive ? '#11141A' : '#BBC5D5'};
  padding: 20px 0;
  position: relative;
  
  &:after{
    content: '';
    position: absolute;
    width: 80%;
    bottom: 0;
    left: 50%;
    transition: height 300ms;
    height:${props.isActive ? '3px' : '0'};
    transform: translate(-50%,-50%);
  }
`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SReservationNavLink = styled.div<ISNavLink>`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

