import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  MIN_SILVER,
  MIN_GOLD,
  MIN_PLATINUM,
  MIN_DIAMOND,
} from "@/src/constants/styles/mediaquerys";

const Bronze = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioCreateReservationImage = styled.img`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;
