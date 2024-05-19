import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND} from "@/src/constants/styles/mediaquerys";

type IBtn = { outlined: boolean }
const Bronze = ({outlined}: IBtn) => css`
  ${outlined ? `
  background: transparent;
  color: #1EABE3;
  ` : `
  background: #1EABE3;
  color: #FFFFFF;
  `}
  border-radius: 4px;
  
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  padding: 16px;
  width: 100%;
  text-align: center;
  transition: background-color 300ms;
  min-width: 130px;
  
  &:hover {
    background: #1d9acc;
    color: #FFFFFF;
  }
  
  cursor: pointer;
  margin-bottom: 6px;
  border: 2px solid #1EABE3;
`;

const Silver = css`
  width: fit-content;
  padding: 12px 18px;
  border-radius: 20px;

`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SStudioDetailsBookBtn = styled.div<IBtn>`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

