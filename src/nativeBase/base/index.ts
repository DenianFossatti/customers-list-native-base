import { default as radius } from './radius';
import { default as theme } from './config';
import { default as typography } from './typography';
import { default as shadows } from './shadows';
import { default as sizes } from './sizes';
import { default as colors } from './colors';

export default {
  radius,
  theme,
  ...typography,
  shadows,
  sizes,
  colors,
};
