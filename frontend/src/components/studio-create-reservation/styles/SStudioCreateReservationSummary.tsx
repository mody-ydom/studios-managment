import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";
import { inter } from '@/src/theme';

const Bronze = css`
padding: 24px 12px;


font-family: ${inter.style.fontFamily};
font-weight: 600;
font-size: 14px;
line-height: 21px;

/* #11141A */
color: #11141A;
p{
  padding: 0;
  margin: 0;
}
`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioCreateReservationSummary = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`}; 
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

