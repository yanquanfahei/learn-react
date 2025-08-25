import fs from 'node:fs'
import path from 'node:path'
import cjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'

const pkgPath = path.resolve(__dirname, '../../packages')
const distPath = path.resolve(__dirname, '../../dist/node_modules')

export function resolvePkgPath(pkgName, isDist = false) {
  if (isDist) {
    return `${distPath}/${pkgName}`
  }
  return `${pkgPath}/${pkgName}`
}

export function getPackagePath(pkgName) {
  const path = `${resolvePkgPath(pkgName)}/package.json`
  const str = fs.readFileSync(path, 'utf-8')
  return JSON.parse(str)
}

export function getBaseRollupPlugins({
  typescript = {},
} = {}) {
  return [cjs(), ts(typescript)]
}
