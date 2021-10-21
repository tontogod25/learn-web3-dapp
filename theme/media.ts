import {css} from 'styled-components';

export type ThemeSizes = {
  xxl: number;
  xl: number;
  lg: number;
  md: number;
  sm: number;
  xs: number;
};

export type ThemeMedia = {
  xxl?: string;
  xl?: string;
  lg?: string;
  md?: string;
  sm?: string;
  xs?: string;
};

export const sizes: ThemeSizes = {
  xxl: 1600,
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xs: 0,
};

const media: ThemeMedia = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

export default media;
