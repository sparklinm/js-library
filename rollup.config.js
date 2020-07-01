import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
const isDev = process.env.NODE_ENV !== 'production'

import babel from 'rollup-plugin-babel'
import pkg from './package.json'
// import { eslint } from 'rollup-plugin-eslint'

export default {
  input: 'main.js',
  // output: {
  //   file: (!isDev && 'bundle.min.js') || 'bundle.js',
  //   format: 'umd',
  //   name: 'util'
  // },
  output: [
    {
      file: (!isDev && pkg.main) || 'd/bundle.cjs.js',
      format: 'cjs'
    },
    {
      file: (!isDev && pkg.module) || 'd/bundle.esm.js',
      format: 'esm'
    },
    {
      file: (!isDev && pkg.browser) || 'd/bundle.umd.js',
      format: 'umd',
      name: 'util'
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    !isDev && terser(),
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      runtimeHelpers: true
    })
  ]
  // external: ['jquery']
}
