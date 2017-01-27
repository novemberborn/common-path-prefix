'use strict'

module.exports = function commonPathPrefix (paths, sep) {
  if (!sep) {
    var m = /(\/|\\)/.exec(paths[0])
    // The first path did not contain any directory components. Bail now.
    if (!m) return ''
    sep = m[0]
  }

  var maxLength = paths[0].lastIndexOf(sep)
  var prefix = paths[0].substr(0, maxLength + 1)
  for (var i = 0; i < paths.length; i++) {
    var lastSep = -1
    for (var j = 0; j < maxLength; j++) {
      var matchChar = paths[i].charAt(j)
      if (matchChar === sep) {
        lastSep = j
      }
      if (matchChar !== prefix.charAt(j)) {
        maxLength = lastSep
      }
      if (maxLength < 0) {
        return ''
      }
    }
  }
  return prefix.substr(0, maxLength + 1)
}
