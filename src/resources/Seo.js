import Resource from './Resource'
import { DeskbookersError } from '../errors'

export default class Seo extends Resource {
  source = 'seo';

  async overviewMainCities (lang, count = null) {
    return await this.request({
      method: 'GET',
      path: `/overview/mainCities/${lang}`,
      query: count ? { count } : null
    })
  }

  async crumbs ({
    lang,
    type,
    typeSlug,
    cityId,
    citySlug,
    cityName,
    cityCoordinate
  } = {}) {
    const query = { lang }

    // Type
    if (type && type.length > 0) {
      query.type = type
    } else if (typeSlug && typeSlug.length > 0) {
      query.typeSlug = typeSlug
    }

    // City
    if (cityId) {
      query.id = cityId
    } else if (citySlug && citySlug.length > 0) {
      query.citySlug = citySlug
    } else if (cityName && cityName.length > 0 && cityCoordinate) {
      query.name = cityName
      query.coordinate = typeof cityCoordinate === 'string'
        ? cityCoordinate
        : JSON.stringify(cityCoordinate)
    }

    return await this.request({
      method: 'GET',
      path: '/crumbs',
      query
    })
  }
}
