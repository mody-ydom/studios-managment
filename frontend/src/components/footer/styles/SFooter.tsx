import {inter} from "@/src/theme";
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";

const Bronze = css`


  font-family: ${inter.style.fontFamily};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #7F8FA4;
  text-align: center;
  padding: 24px;
  margin-top: 40px;
`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SFooter = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

