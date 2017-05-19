import Resource from './Resource'

export default class Actions extends Resource {
  async report (params) {
    const {
      message,
      category,
      browser,
      page,
      context,
      extras = []
    } = params

    return await this.request({
      method: 'POST',
      path: 'report',
      params: {
        message,
        category,
        browser,
        page,
        context,
        extras
      }
    })
  }
}
