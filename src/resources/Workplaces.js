const Resource = require('./Resource')

class Workplaces extends Resource {
  constructor (api) {
    super(api)
    this.endpoint = 'workplace'
  }

  retrieve (workplaceId) {
    return this.request({
      method: 'GET',
      path: `/${this.endpoint}/${workplaceId}`,
      fields: []
    })
  }
}

module.exports = Workplaces
