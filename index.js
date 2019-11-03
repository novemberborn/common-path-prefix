'use strict'
const { sep: DEFAULT_SEPARATOR } = require('path')

const determineSeparator = paths => {
  for (const path of paths) {
    const match = /(\/|\\)/.exec(path)
    if (match !== null) return match[0]
  }

  return DEFAULT_SEPARATOR
}

module.exports = function commonPathPrefix (paths, sep = determineSeparator(paths)) {
  const [first = '', ...remaining] = paths
  if (first === '') return ''

  const parts = first.split(sep)

  let prefix = parts.length
  for (const p of paths) {
    const compare = p.split(sep)
    for (let i = 0; i < prefix; i++) {
      if (compare[i] !== parts[i]) {
        prefix = i
      }
    }

    if (prefix === 0) break
  }

  return prefix === 0 ? '' : parts.slice(0, prefix).join(sep) + sep
}
