const resources = {
  Workplaces: require('./resources/Workplaces')
}

class Deskbookers {
  constructor () {
    for (let name in resources) {
      this[`${name.toLowerCase()}`] = new resources[name]()
    }
  }
}

module.exports = Deskbookers
