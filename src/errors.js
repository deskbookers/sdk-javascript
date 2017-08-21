const MAX_ERROR_LENGTH = 100

export class DeskbookersError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DeskbookersError'
  }
}

export class InvalidResponseError extends DeskbookersError {
  constructor (text, url = null) {
    // Prepare text
    text = `${text || ''}`
    let shortText = text
    if (shortText.length > MAX_ERROR_LENGTH) {
      shortText = `${shortText.substr(0, MAX_ERROR_LENGTH)}...`
    }

    super(`Invalid API response received ${url ? `from ${url}` : ''}: ${shortText}`)
    this.name = 'InvalidResponseError'
    this.text = text
  }
}
