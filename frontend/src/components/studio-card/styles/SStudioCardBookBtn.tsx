import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  MIN_SILVER,
  MIN_GOLD,
  MIN_PLATINUM,
  MIN_DIAMOND,
} from "@/src/constants/styles/mediaquerys";

const Bronze = css`
  width: 40%;
  background: #1eabe3;
  border-radius: 20px;
  padding: 12px;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
  transition: background-color 300ms;
  border: none;
  display: none;
  &:hover {
    background: #1d9acc;
  }
  cursor: pointer;

`;

const Silver = css`
  display: block;
`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioCardBookBtn = styled.button`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;
