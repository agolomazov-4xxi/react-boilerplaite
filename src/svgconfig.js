import loadSprite from 'webpack-svgstore-plugin/src/helpers/svgxhr';

/* eslint-disable */
const __svgsprite__ = {
  path: './icons/*.svg',
  name: 'svg/owm-sprite.svg',
};

export default () => loadSprite(__svgsprite__);
/* eslint-enable */
