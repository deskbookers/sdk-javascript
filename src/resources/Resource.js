import fetch from '../utils/fetch'
import { signer, formatArgs } from '../utils/requests'

export default class Resource {
  constructor (api) {
    this.api = api
  }

  get apiUrl () {
    const protocol = this.api.https ? 'https' : 'http'
    const url = `${protocol}://${this.api.host}/userapi/v${this.api.version}`
    return url
  }

  async request ({ path, fields = [], params = {}, method = 'get' }) {
    const options = {
      method: method.toLowerCase(),
      headers: {}
    }

    const args = {
      __resellerID: this.api.resellerId,
      __i18n: this.api.language,
      __fields: fields,
      ...params
    }
    const queryStr = formatArgs(args, options.method === 'post')
    const pathFixed = path.replace(/^\/+|\/+$/, '')

    let url
    if (options.method === 'post') {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      options.body = queryStr
      url = `${this.apiUrl}/${pathFixed}`
    } else {
      url = `${this.apiUrl}/${pathFixed}?${queryStr}`
    }

    const {
      url: requestUrl,
      options: requestOptions
    } = await this.prepareRequest(url, options, args)

    const response = await fetch(requestUrl, requestOptions)
    return await this.parseResponse(response)
  }

  async parseResponse (response) {
    // Retrieve json data
    const data = await response.json()

    // Parse response data
    if (data && typeof data === 'object') {
      if (data.error) {
        const msg = data.errorMessage || 'An error occurred'
        const extra = data.errorTrace && data.errorTrace.length > 0
          ? ` (${data.errorTrace[0].file}:${data.errorTrace[0].line})`
          : null
        throw new Error(`${data.errorCode || 500}: ${msg}${extra}`)
      } else if (data.errors && data.errors.length > 0) {
        for (let i = 0; i < data.errors.length; ++i) {
          const msg = data.errors[i].title || data.errors[i].detail
          console.error(data.errors[i])
          throw new Error(`${data.errors[i].code || 500}: ${msg}`)
        }
      } else if ('result' in data) return data.result
    }

    // Error
    throw new Error('500: Invalid response received')
  }

  async prepareRequest (url, options, args) {
    // Sign request?
    if (this.api.hasSession()) {
      return signer(this.api.session, url, options, args)
    } else {
      return { url, options }
    }
  }
}
