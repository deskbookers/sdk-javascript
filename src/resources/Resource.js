import fetch from '../lib/fetch'
import { signer, formatArgs } from '../lib/request-utils'

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
      __i18n: this.api.lang,
      __fields: fields,
      ...params
    }
    const queryStr = formatArgs(args, options.method === 'post')

    let url
    if (options.method === 'post') {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
      options.body = queryStr
      url = `${this.apiUrl}/${path.replace(/^\/+|\/+$/, '')}`
    } else {
      url = `${this.apiUrl}/${path.replace(/^\/+|\/+$/, '')}?${queryStr}`
    }

    const {
      url: requestUrl,
      options: requestOptions
    } = await this.prepareRequest(url, options, args)

    try {
      const response = await fetch(requestUrl, requestOptions)
      return await this.parseResponse(response)
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async parseResponse (response) {
    // Retrieve json data
    let data
    try {
      data = await response.text()
      data = JSON.parse(data)
    } catch (e) {
      console.log('Invalid JSON result received:\n', data)
      console.error(e)
      throw e
    }

    // Parse response data
    try {
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
      console.error('Invalid response format:', data)
      throw new Error('500: Invalid response received')
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async prepareRequest (url, options, args) {
    if (this.api.hasSession()) {
      return signer(this.api.getSession(), url, options, args)
    }

    // Or don't sign
    return { url, options }
  }
}
