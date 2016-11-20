class DeskbookersError extends Error {
  constructor (message) {
    super()
    this.type = 'DeskbookersError'
    this.message = message
  }
}

module.exports = DeskbookersError
