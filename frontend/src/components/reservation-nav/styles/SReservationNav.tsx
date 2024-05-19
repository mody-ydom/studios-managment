import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND} from "@/src/constants/styles/mediaquerys";

const Bronze = css`
  display: flex;
  gap: 24px;
  border: 1px solid #E2E7EE
`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SReservationNav = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

