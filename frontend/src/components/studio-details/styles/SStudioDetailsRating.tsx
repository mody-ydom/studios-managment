import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  MIN_SILVER,
  MIN_GOLD,
  MIN_PLATINUM,
  MIN_DIAMOND,
} from "@/src/constants/styles/mediaquerys";
import { inter } from "@/src/theme";
import { ratingClasses } from "@mui/material";

const Bronze = css`
  display: none;
`;

const Silver = css`
  display: flex;
  .${ratingClasses.root} {
    color: #11141A;
  }
  font-family: ${inter.style.fontFamily};
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
  color: #11141A;
  flex-grow: 1;
`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioDetailsRating = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;
