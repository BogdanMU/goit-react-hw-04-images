import styled, { keyframes } from 'styled-components';

const ldsHourglass = keyframes`
0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }`;

export const SpinningGlass = styled.div`
  display: inline-block;
  z-index: 100;
  width: 80px;
  height: 80px;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin: 8px;
    color: black;
    box-sizing: border-box;
    border: 32px solid #000;
    border-color: red black red black;
    animation: ${ldsHourglass} 1.2s infinite;
  }
`;
