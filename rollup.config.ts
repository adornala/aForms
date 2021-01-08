import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import json from '@rollup/plugin-json'

const pkg = require('./package.json')

const libraryName = pkg.name

export default {
   input: `src/index.ts`,
   output: [
      { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
      { file: pkg.module, format: 'es', sourcemap: true },
   ],
   // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
   external: [],
   watch: {
      include: 'src/**',
   },
   plugins: [
      // Allow json resolution
      json(),
      // Compile TypeScript files
      typescript({ module: 'CommonJS' }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs({ extensions: ['.js', '.ts'] }),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      nodeResolve(),
      // Resolve source maps to the original source
      sourceMaps(),
   ]
}
