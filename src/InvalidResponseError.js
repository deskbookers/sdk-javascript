import DeskbookersError from './DeskbookersError'

const MAX_ERROR_LENGTH = 100

export default class InvalidResponseError extends DeskbookersError {
  constructor (text) {
    // Prepare text
    text = `${text || ''}`
    if (text.length > MAX_ERROR_LENGTH) {
      text = `${text.substr(0, MAX_ERROR_LENGTH)}...`
    }

    super(`Invalid API response received: ${text}`)
    this.name = 'InvalidResponseError'
  }
}
