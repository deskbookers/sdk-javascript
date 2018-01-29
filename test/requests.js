import test from 'ava'
import { phpJsonEncode } from '../src/utils/requests.js'

const FS = '/'
const BS = '\\'

test('Test forward slash', t => {
  const testString = `"${BS}${FS}"`
  const convertedString = phpJsonEncode(FS)
  t.is(testString, convertedString)
})

test('Test both slash', t => {
  const testString = `"${BS}${BS}${BS}${FS}"`
  const convertedString = phpJsonEncode(BS + FS)
  t.is(testString, convertedString)
})

test('Test foo forward slash bar', t => {
  const testString = `"foo${BS}${FS}bar"`
  const convertedString = phpJsonEncode(`foo${FS}bar`)
  t.is(testString, convertedString)
})
