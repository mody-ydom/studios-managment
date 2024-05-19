import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";
import { inter } from '@/src/theme';

const Bronze = css`

font-weight: 600;
font-size: 25px;
line-height: 38px;
color: #FFFFFF;

`;

const Silver = css`
font-family: ${inter.style.fontFamily};
font-size: 30px;
font-weight: 700;
line-height: 52px;
text-align: left;
color:#11141A;
flex-grow: 1;
`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioDetailsName = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`}; 
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

