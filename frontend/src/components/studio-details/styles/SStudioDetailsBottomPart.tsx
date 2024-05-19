import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";

const Bronze = css`
padding: 24px 16px 32px;
`
const Silver = css`
background-color:#fff;
padding: 20px 32px 0;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioDetailsBottomPart = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`}; 
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

