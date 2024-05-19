import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";
import { inter } from '@/src/theme';

const Bronze = css`

font-family: ${inter.style.fontFamily};
font-weight: 500;
font-size: 16px;
line-height: 24px;

color: #322A7D;
`;

const Silver = css`
width: 100%;`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioDetailsDirections = styled.a`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`}; 
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

