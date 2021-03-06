import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    url({ exclude: ['**/*.svg'] }),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    typescript({
      rollupCommonJSResolveHack: false,
      clean: true,
    }),
    copy({
      targets: [
        { src: 'dist/*', dest: 'example/node_modules/react-use-mapped-state' },
      ],
    }),
  ],
};
