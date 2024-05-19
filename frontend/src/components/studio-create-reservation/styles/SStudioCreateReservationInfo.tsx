import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";
import { inter } from '@/src/theme';

const Bronze = css`
display: flex;
justify-content: flex-start;
align-items: center;
padding: 12px;
border-bottom: 1px solid #D3D3D3;
gap: 15px;

h3{
font-family: ${inter.style.fontFamily};
font-weight: 700;
font-size: 16px;
line-height: 19px;
color: #11141A;
margin-bottom: 6px;
}
h4{

}


`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioCreateReservationInfo = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`}; 
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

