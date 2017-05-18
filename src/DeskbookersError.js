export default class DeskbookersError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DeskbookersError'
  }
}
