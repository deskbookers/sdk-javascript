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

    try {
      const {
        url: requestUrl,
        options: requestOptions
      } = await this.prepareRequest(url, options, args)

      const response = await fetch(requestUrl, requestOptions)
      return this.parseResponse(response)
    } catch (e) {
      return false
    }
  }

  async parseResponse (response) {
    const data = await response.json()

    const {
      data: dataProp,
      result,
      errors,
      error
    } = data

    // If "data" exists in response
    if (dataProp) {
      return dataProp
    }

    // If "result" exists in response
    else if (result) {
      const { errors } = result
      if (errors) {
        for (let error in errors) {
          throw new Error(errors[error])
        }
      }
      return result
    }

    // If "error" exists in response
    else if (error) {
      const msg = data.errorMessage || 'An error occurred'
      throw new Error(msg)
    }

    // If "errors" exists in response
    else if (errors) {
      for (let error in errors) {
        const msg = errors[error].title || errors[error].detail
        throw new Error(msg)
      }
    }

    // Reject
    throw new Error('Invalid response received')
  }

  prepareRequest (url, options, args) {
    // Sign request?
    if (this.api.session) {
      return signer(this.api.session, url, options, args)
    } else {
      return { url, options }
    }
  }
}
