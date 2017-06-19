import Resource from './Resource'

export default class Actions extends Resource {
  async reportToSales (params) {
    const {
      context,
      extras = []
    } = params

    return await this.request({
      method: 'POST',
      path: 'report_sales',
      params: {
        context,
        extras
      }
    })
  }

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
        page: encodeURIComponent(page),
        context,
        extras
      }
    })
  }
}
