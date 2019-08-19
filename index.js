'use strict'

module.exports = function commonPathPrefix (paths, sep) {
  if (!sep) {
    const m = /(\/|\\)/.exec(paths[0])
    // The first path did not contain any directory components. Bail now.
    if (!m) return ''
    sep = m[0]
  }

  // unicode is a bit of a special beast, so instead of charAt we will
  // need to create an array of code points first
  // https://ponyfoo.com/articles/es6-strings-and-unicode-in-depth
  const prefix = paths[0].split(sep)
  let maxLength = prefix.length

  for (let i = 1; i < paths.length; i++) {
    const matchArray = paths[i].split(sep)
    for (let j = 0; j < maxLength; j++) {
      if (matchArray[j] !== prefix[j]) {
        maxLength = j
      }
      if (maxLength === 0) {
        return ''
      }
    }
  }
  return prefix.slice(0, maxLength).join(sep) + (maxLength > 0 ? sep : '')
}
