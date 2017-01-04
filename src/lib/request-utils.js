import { hmac, sha512 } from 'hash.js'
import { parse } from 'url'
import { stringify } from 'qs'

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
  phpJsonEncode(jsonifyArgs(args))
].join('\n')

export const phpJsonEncode = (s) => {
  const chars = JSON.stringify(typeof s === 'undefined' ? null : s)
  let newS = ''
  for (let i = 0; i < chars.length; ++i) {
    if (chars[i] === '/') newS += '\\/'
    else if (chars[i].charCodeAt(0) > 127) {
      newS += '\\u' + ('000' + chars[i].charCodeAt(0).toString(16)).slice(-4)
    } else newS += chars[i]
  }
  return newS
}

export const onlyAmpEncode = (str) => (str + '').toString()
  .replace('&', '%26')

export const phpUrlEncode = (str) => encodeURIComponent((str + '').toString())
  .replace(/!/g, '%21')
  .replace(/'/g, '%27')
  .replace(/\(/g, '%28')
  .replace(/\)/g, '%29')
  .replace(/\*/g, '%2A')
  .replace(/%20/g, '+')
