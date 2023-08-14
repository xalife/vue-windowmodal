import vue from 'rollup-plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve'; // Added this line
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import css from 'rollup-plugin-css-only';

export default {
  input: 'src/export.js',
  output: {
    format: 'umd',
    name: 'VueWindowModal',
    file: 'dist/vue-window-library.js',
  },
  plugins: [
    resolve(), // Added this line
    vue(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
      runtimeHelpers: true,
    }),
    commonjs(),
    terser(),
    css()
  ],
  external: ['vue'],
};
