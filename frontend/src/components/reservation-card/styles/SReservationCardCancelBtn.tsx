import {lato} from "@/src/theme";
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";

const Bronze = css`
  font-family: ${lato.style.fontFamily};
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #1EABE3;
  cursor: pointer;
border: none;
  background-color: transparent;
  transition: background-color 300ms, color 300ms;
  padding: 10px;
  border-radius: 4px;
  &:hover{
    color: #fff;
    background-color: red;
  }

`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SReservationCardCancelBtn = styled.button`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

