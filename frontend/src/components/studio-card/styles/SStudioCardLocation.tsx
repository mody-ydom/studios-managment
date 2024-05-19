import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";
import { inter } from '@/src/theme';

const Bronze = css`
width: 70%;


font-family: ${inter.style.fontFamily};
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 24px;
color: #FFFFFF;

display: flex;
align-items: flex-start;

path{
  fill: #AFBBCB;
}
`;

const Silver = css`
width: 60%;
padding-right: 10px;

font-family: ${inter.style.fontFamily};
font-weight: 400;
font-size: 16px;
line-height: 24px;

color: #11141A;
path{
  fill: #7f8fa4;
}


`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioCardLocation = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`}; 
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

