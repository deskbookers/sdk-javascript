const Resource = require('./Resource')

class Workplaces extends Resource {
  constructor () {
    super()
    this.endpoint = 'workplace'
  }

  retrieve (workplaceId) {
    return this.request({
      method: 'GET',
      path: `/${this.endpoint}/${workplaceId}`
    })
  }
}

module.exports = Workplaces
