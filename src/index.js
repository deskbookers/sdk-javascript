import resources from './resources'
import { signData, buildCheckData } from './utils/requests'

const API_HOST = 'backoffice.2cnnct.com'
const API_VERSION = 1
const API_LANGUAGE = 'en-gb'
const API_RESELLER_ID = 10000
const API_AVAILABILITY_HOST = 'api-availability.deskbookers.com'
const API_AVAILABILITY_PATH = ''
const API_FEATURE_HOST = 'api-features.deskbookers.com'
const API_FEATURE_PATH = ''
const API_NOTIFICATIONS_HOST = 'api-notifications.deskbookers.com'
const API_NOTIFICATIONS_PATH = ''
const API_PAYMENTS_HOST = 'api-payments.deskbookers.com'
const API_PAYMENTS_PATH = ''
const API_REPORTS_HOST = 'api-reports.deskbookers.com'
const API_REPORTS_PATH = ''
const API_SEARCH_HOST = 'api-search.deskbookers.com'
const API_SEARCH_PATH = ''
const API_SEO_HOST = 'api-seo.deskbookers.com'
const API_SEO_PATH = ''

export default class Deskbookers {
  constructor ({
    https = true,
    host = API_HOST,
    version = API_VERSION,
    language = API_LANGUAGE,
    resellerId = API_RESELLER_ID,
    sources = {
      availability: {
        host: API_AVAILABILITY_HOST,
        path: API_AVAILABILITY_PATH
      },
      features: {
        host: API_FEATURE_HOST,
        path: API_FEATURE_PATH
      },
      notifications: {
        host: API_NOTIFICATIONS_HOST,
        path: API_NOTIFICATIONS_PATH
      },
      payments: {
        host: API_PAYMENTS_HOST,
        path: API_PAYMENTS_PATH
      },
      reports: {
        host: API_REPORTS_HOST,
        path: API_REPORTS_PATH
      },
      search: {
        host: API_SEARCH_HOST,
        path: API_SEARCH_PATH
      },
      seo: {
        host: API_SEO_HOST,
        path: API_SEO_PATH
      }
    }
  }) {
    // Options
    this.https = https
    this.host = host
    this.version = version
    this.language = language
    this.resellerId = resellerId
    this.sources = sources
    this.session = null

    // Initialise resources
    for (const resource in resources) {
      this[resource] = new resources[resource](this)
    }
  }
}

/**
 * Authenticate a request
 *
 * @param String url URL of the request
 * @param String method Method of the request (e.g. POST or GET)
 * @param Object data Either the POST or the GET (query) data
 * @param String timestamp The timestamp header
 * @param String privateKey The private key retrieved using the Authenticate header
 * @param String hash The hash to compare the check hash to
 * @return Bool
 */
export function authenticate (url, method, data, timestamp, privateKey, hash, rawBody = false) {
  const checkData = buildCheckData(url, { method, rawBody }, data, timestamp)
  return signData(checkData, privateKey) === hash
}
