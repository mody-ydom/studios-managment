import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";

const Bronze = css`
width: 100%;
padding-top:107.5%;
position: relative;
display: block;
&:after {
    background-color: #09090973;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
}
`;

const Silver = css`

padding-top: 64.1%;
/* Rectangle 26 */
border-radius:20px;
overflow: hidden;
`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioCardImage = styled.picture`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`}; 
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

