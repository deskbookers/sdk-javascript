import { hmac, sha512 } from 'hash.js'
import { parse } from 'url'
import { stringify } from 'qs'
import jsonEncode from 'json_encode'
import urlencode from 'phpurlencode'

export const signer = ({ publicKey, privateKey }, url, options, args) => {
  // Prepare vars
  const timestamp = Math.round(new Date().getTime() / 1000)

  // Sign data
  const checkData = buildCheckData(url, options, args, timestamp)
  const hash = signData(checkData, privateKey)

  // Add headers
  return {
    url,
    options: {
      ...options,
      headers: {
        ...options.headers,
        Timestamp: timestamp,
        Authenticate: `${publicKey}:${hash}`
      }
    }
  }
}

export const jsonifyArgs = (args) => {
  let formatted = { ...args }
  for (let key in formatted) formatted[key] = phpJsonEncode(formatted[key])
  return formatted
}

export const formatArgs = (args, encode) => stringify(
  jsonifyArgs(args),
  { encoder: encode ? phpUrlEncode : onlyAmpEncode }
)

export const signData = (data, privateKey) => hmac(sha512, privateKey)
  .update(data)
  .digest('hex')

export const buildCheckData = (url, options, args, timestamp) => [
  options.method.toUpperCase(),
  timestamp,
  parse(url).path,
  options.method.toUpperCase() === 'POST'
    ? phpJsonEncode(jsonifyArgs(args))
    : phpJsonEncode([])
].join('\n')

export const phpJsonEncode = (val) => jsonEncode(
  typeof val === 'undefined'
    ? null
    : val
)

export const onlyAmpEncode = (str) => (str + '').toString()
  .replace('&', '%26')

export const phpUrlEncode = urlencode
