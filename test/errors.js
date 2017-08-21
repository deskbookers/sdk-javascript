import test from 'ava'
import { DeskbookersError, InvalidResponseError } from '../src/errors'

test('DeskbookersError', async t => {
  const e = new DeskbookersError('Test')

  t.truthy(e instanceof Error)
  t.is(e.name, 'DeskbookersError')
  t.is(e.message, 'Test')
})

test('InvalidResponseError', async t => {
  const text = 'Test abc'.repeat(100)
  const e = new InvalidResponseError(text, 'http://example.org')

  t.truthy(e instanceof Error)
  t.is(e.name, 'InvalidResponseError')
  t.truthy(e.message.indexOf(`${text.substr(0, 100)}...`) !== -1)
  t.is(e.text, text)
})
