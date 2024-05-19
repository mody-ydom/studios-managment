import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND} from "@/src/constants/styles/mediaquerys";

const Bronze = css`
  background-color: #fff;
  border: 1px solid #EAEAEA;
  border-radius: 12px;
  padding: 21px 21px 16px;
  hr{
    border: 1px solid #EAEAEA;
    background-color: transparent;
    flex: 1 0 100%;
    width: 100%;
    height: 0;
    margin: 0;
    
  }
  display: flex;
  flex-wrap: wrap;
  gap:16px 24px;
  width: max(310px, calc((100% - 24px ) / 2));

`;

const Silver = css`
  width: max(310px, calc((100% - 24px * 2) / 3));
`;

const Gold = css`
  width: max(310px, calc((100% - 24px * 3) / 4));
`;

const Platinum = css``;

const Diamond = css``;

export const SReservationCard = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

