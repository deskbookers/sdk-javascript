const Resource = require('./Resource')

class Workplaces extends Resource {
  constructor () {
    super()
    this.endpoint = 'workplace'
  }
}

module.exports = Workplaces
