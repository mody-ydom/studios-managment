import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";
import { inter } from '@/src/theme';

const Bronze = css`
padding-bottom: 22px;
color: #11141A;

h3{
font-weight: 600;
font-size: 20px;
line-height: 30px;
color: #353840;
}

p{
font-family: ${inter.style.fontFamily};
font-weight: 400;
font-size: 16px;
line-height: 24px;
}


svg{
  display: none;
}
`;

const Silver = css`
width: 100%;
padding: 20px;
margin-top: 20px;
border-top: 1px solid #D3D3D3;
display: flex;
flex-wrap: wrap;
align-items: center;
h3{
  display: none;
}


svg{
  display: block;
}
`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioDetailsLocation = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`}; 
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

