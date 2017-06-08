import { signer, formatArgs } from '../utils/requests'
import platform from 'platform'
import { get } from 'lodash'
import {
  DeskbookersError,
  InvalidResponseError
} from '../errors'

export default class Resource {
  source = null

  constructor (api) {
    this.api = api
  }

  get apiUrl () {
    const { version, sources } = this.api
    let { host, https } = this.api
    let path = `/userapi/v${version}`

    // Overwrite settings with source settings when set
    const sourceSettings = get(sources, this.source)
    if (sourceSettings) {
      host = get(sourceSettings, 'host', host)
      path = `/${get(sourceSettings, 'path', path)}`.replace(/\/+$/, '')
      https = get(sourceSettings, 'https', https)
    }

    // Build URL
    const protocol = https ? 'https' : 'http'
    return `${protocol}://${host}${path}`
  }

  async request ({
    path,
    fields = [],
    params = {},
    method = 'GET',
    mode = 'cors',
    credentials = 'include'
  }) {
    method = method.toUpperCase()
    const options = {
      mode,
      credentials,
      method,
      headers: {}
    }
    const args = {
      __resellerID: this.api.resellerId,
      __i18n: this.api.language,
      __fields: fields,
      ...params
    }

    const shouldEncodeArgs = options.method === 'POST' || (platform.name === 'IE' && parseFloat(platform.version) < 12)
    const queryStr = formatArgs(args, shouldEncodeArgs)
    const pathFixed = path.replace(/^\/+|\/+$/, '')

    let url
    if (options.method === 'POST') {
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
    // In case of an incorrect response we want to know that the raw response
    // was. Because of this we can't use response.json()
    let text = await response.text()
    let data
    try {
      data = JSON.parse(text)
    } catch (e) {
      throw new InvalidResponseError(text)
    }

    const {
      data: dataProp,
      result,
      errors,
      error
    } = data

    // If "data" exists in response
    if (dataProp) {
      return dataProp

    // If "result" exists in response
    } else if (result) {
      const { errors } = result
      if (errors) {
        for (let error in errors) {
          throw new DeskbookersError(errors[error])
        }
      }
      return result

    // If "error" exists in response
    } else if (error) {
      const msg = data.errorMessage || 'An error occurred'
      throw new DeskbookersError(msg)

    // If "errors" exists in response
    } else if (errors) {
      for (let error in errors) {
        const msg = errors[error].title || errors[error].detail
        throw new DeskbookersError(msg)
      }
    }

    // Reject
    throw new DeskbookersError('Invalid response received')
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
