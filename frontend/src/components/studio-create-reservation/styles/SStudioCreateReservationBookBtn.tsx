import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";
import { inter } from '@/src/theme';

const Bronze = css`

padding: 12px 39px;
gap: 10px;


background: #1EABE3;
border-radius: 20px;
border: none;

font-family: ${inter.style.fontFamily};
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 24px;
color: #FFFFFF;
margin-top: 26px;
margin-left: auto;
margin-right: 7.5%;
cursor: pointer;
transition: background-color 300ms;
  border: none;
  &:hover {
    background: #1d9acc;
  }

&:disabled{
  cursor: not-allowed;
  background: #126586;
  opacity: 0.3;
}
`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioCreateReservationBookBtn = styled.button`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`}; 
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

