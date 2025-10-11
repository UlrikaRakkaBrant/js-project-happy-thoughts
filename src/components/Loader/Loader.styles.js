import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const SpinnerWrap = styled.div`
  display: grid;
  place-items: center;
  padding: 12px 0;

  & > div {
    width: 28px;
    height: 28px;
    border: 3px solid #ffd1dd;
    border-top-color: var(--heart);
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;
