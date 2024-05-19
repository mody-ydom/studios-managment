import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MIN_SILVER, MIN_GOLD, MIN_PLATINUM, MIN_DIAMOND } from "@/src/constants/styles/mediaquerys";

const Bronze = css``;

const Silver = css`
display: block;
  margin: 120px auto 0;
  width: calc(100% - 170px);
`;

const Gold = css``;

const Platinum = css``;

const Diamond = css``;

export const SPageWrapperContainer = styled.div`
  ${Bronze};
  ${MIN_SILVER`${Silver}`};
  ${MIN_GOLD`${Gold}`};
  ${MIN_PLATINUM`${Platinum}`};
  ${MIN_DIAMOND`${Diamond}`};
`;

