import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";

const Bronze = css`
display: flex;
flex-direction: column;
align-items: center;

`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioCreateReservation = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`}; 
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

