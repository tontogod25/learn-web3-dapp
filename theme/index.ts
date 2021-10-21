import {colors} from './colors';
import media, {ThemeMedia, ThemeSizes, sizes} from './media';

export type Theme = {
  colors: any;
  media: ThemeMedia;
  sizes: ThemeSizes;
};

const theme: Theme = {
  colors,
  media,
  sizes,
};

export default theme;
