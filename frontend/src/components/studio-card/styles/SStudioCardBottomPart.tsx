import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";

const Bronze = css`
position: absolute;
bottom: 0;
left: 0;
right: 0;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: space-between;
padding: 0 16px 12px;
background-color:#1C1C1C66;
z-index: 3;
`;

const Silver = css`
position: relative;
padding: 14px;
background-color: transparent;
`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioCardBottomPart = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`}; 
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

