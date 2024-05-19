import {lato} from "@/src/theme";
import {css} from '@emotion/react';
import styled from '@emotion/styled';
import {MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND} from "@/src/constants/styles/mediaquerys";

type ICardProp = { halfWidth?: boolean }

const Bronze = (props) => css`
  font-family: ${lato.style.fontFamily};
  font-weight: 700;
  flex: 0 0 ${props.halfWidth ? 'calc(50% - 24px)' : '100%'};
  width: ${props.halfWidth ? 'calc(50% - 24px)' : '100%'};
  h3 {
    font-size: 12px;
    line-height: 14px;
    color: #7F8FA4;
    padding: 0;
    margin: 0;
  }
  
  h4 {
    font-size: 14px;
    line-height: 17px;
    color: #354052;
    padding: 0;
    margin: 0;
  }`;

const Silver = css``;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SReservationCardProp = styled.div<ICardProp>`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

