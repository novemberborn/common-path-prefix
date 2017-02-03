import test from 'ava'

import commonPathPrefix from './'

test('returns an empty string if there is no common prefix', t => {
  t.is(commonPathPrefix(['foo', 'bar'], '/'), '')
})

test('returns the longest common prefix', t => {
  t.is(commonPathPrefix(['/foo/bar/baz/qux', '/foo/bar/baz/quux'], '/'), '/foo/bar/baz/')
})

test('supports relative paths', t => {
  t.is(commonPathPrefix(['./foo/bar/baz/qux', './foo/bar/baz/quux'], '/'), './foo/bar/baz/')
})

test('the file separator may be a prefix', t => {
  t.is(commonPathPrefix(['/foo/bar', '/baz/qux'], '/'), '/')
})

test('the file separator is determined by the first occurence of / or \\ in the first path', t => {
  t.is(commonPathPrefix(['/foo/bar', '/baz/qux']), '/')
  t.is(commonPathPrefix(['./foo/bar', './baz/qux']), './')
  t.is(commonPathPrefix(['foo/bar/baz', 'foo/bar/qux']), 'foo/bar/')

  t.is(commonPathPrefix(['\\foo\\bar', '\\baz\\qux']), '\\')
  t.is(commonPathPrefix(['.\\foo\\bar', '.\\baz\\qux']), '.\\')
  t.is(commonPathPrefix(['foo\\bar\\baz', 'foo\\bar\\qux']), 'foo\\bar\\')

  t.is(commonPathPrefix(['/foo/bar', '\\baz\\qux']), '')
  t.is(commonPathPrefix(['foo', '\\baz\\qux']), '')
})

test('the file separator can be specified', t => {
  t.is(commonPathPrefix(['/foo/bar', '/baz/qux'], '\\'), '')
  t.is(commonPathPrefix(['\\foo\\bar', '\\baz\\qux'], '/'), '')
  t.is(commonPathPrefix(['foo$bar$baz', 'foo$bar$qux'], '$'), 'foo$bar$')
})

test('the file separator can be a multi-byte string', t => {
  t.is(commonPathPrefix(['foo👼bar👼baz', 'foo👼bar👼qux'], '👼'), 'foo👼bar👼')
})
