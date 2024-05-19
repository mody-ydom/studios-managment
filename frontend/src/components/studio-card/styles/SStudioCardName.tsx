import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";
import { mulish } from '@/src/theme';

const Bronze = css`
width:100%;

font-weight: 600;
font-size: 18px;
line-height: 27px;

color: #FFFFFF;

padding: 12px 0;
`;

const Silver = css`
padding: 28px 0;
margin-bottom: 12px;
font-family: ${mulish.style.fontFamily};
font-weight: 600;
font-size: 25px;
line-height: 31px;

color: #000000;

border-bottom: 1px solid #7C6A46;
`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioCardName = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`}; 
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

