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
  const prefix = [...paths[0]]
  var maxLength = prefix.length
  for (var i = 1; i < paths.length; i++) {
    const matchArray = [...paths[i]]
    var lastSep = -1
    for (var j = 0; j < maxLength; j++) {
      const matchChar = matchArray[j]
      if (matchChar === sep) {
        lastSep = j
      }
      if (matchChar !== prefix[j]) {
        maxLength = lastSep
      }
      if (maxLength < 0) {
        return ''
      }
    }
  }
  return prefix.slice(0, maxLength + 1).join('')
}
