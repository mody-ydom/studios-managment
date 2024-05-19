import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  MIN_SILVER,
  MIN_GOLD,
  MIN_PLATINUM,
  MIN_DIAMOND,
} from "@/src/constants/styles/mediaquerys";

const Bronze = css`
  display: none;
`;

const Silver = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
    &:nth-of-type(1) {
      grid-column: 1;
      grid-row: 1 / span 2;
    }
    &:nth-of-type(2) {
      grid-column: 2;
      grid-row: 1;
    }
    &:nth-of-type(3) {
      grid-column: 2;
      grid-row: 2;
    }
    &:nth-of-type(4) {
      grid-column: 3;
      grid-row: 1;
    }
    &:nth-of-type(5) {
      grid-column: 3;
      grid-row: 2;
    }
  }
`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioDetailsGridImages = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;
