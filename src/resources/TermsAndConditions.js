import Resource from './Resource'
import { DeskbookersError } from '../errors'

export default class TermsAndConditions extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'tc'
  }

  async listActive () {
    return await this.request({
      method: 'GET',
      path: `/${this.endpoint}/active`,
      fields: []
    })
  }

  async userPending (userId) {
    return await this.request({
      method: 'GET',
      path: `/${this.endpoint}/userPending`,
      params: {userId}
    })
  }

  async userAccepted (userId) {
    return await this.request({
      method: 'GET',
      path: `/${this.endpoint}/userAccepted`,
      params: {userId}
    })
  }

  async userAccept ({userId, tcId}) {
    return await this.request({
      method: 'POST',
      path: `/${this.endpoint}/userAccept`,
      params: {
        userId, tcId
      }
    })
  }
}
