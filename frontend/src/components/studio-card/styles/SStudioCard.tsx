import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  MIN_SILVER,
  MIN_GOLD,
  MIN_PLATINUM,
  MIN_DIAMOND,
} from "@/src/constants/styles/mediaquerys";

const Bronze = css`
  position: relative;
  width: min(80%, 420px);
  background-color: #000;
  display: block;
`;

const Silver = css`
  width: calc((100% - 24px * 2) / 3);
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 4px 30px -5px #0000001A;
`;

const Gold = css``;

const Platinum = css`
  width: calc((100% - 24px * 3) / 4);
`;

const Diamond = css``;

export const SStudioCard = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;
