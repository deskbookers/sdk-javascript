import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
dotenv.load()

const {
  API_SEARCH_HOST,
  API_SEARCH_PATH,
  API_HTTPS,
  API_HOST
} = process.env

async function client () {
  const deskbookers = new Deskbookers({
    https: API_HTTPS === 'true',
    host: API_HOST,
    sources: {
      search: {
        host: API_SEARCH_HOST,
        path: API_SEARCH_PATH
      }
    }
  })

  return deskbookers
}

test('spaces', async t => {
  // Prepare API
  const deskbookers = await client()

  const result = await deskbookers.search.spaces({
    location: {
      text: 'Amsterdam'
    },
    facets: {
      cluster: true,
      types: true,
      price: true,
      spaceFacilities: true
    },
    perPage: 10,
    page: 1
  })

  // Test results
  t.truthy(result.total)
  t.truthy(result.results)
  t.is(result.results.length <= result.total, true)

  // Test context
  t.truthy(result.context)
  t.truthy(result.context.location)
  t.truthy(result.context.location.northEast)
  t.truthy(result.context.location.northEast.latitude)
  t.truthy(result.context.location.southWest)
  t.truthy(result.context.location.southWest.latitude)
  t.truthy(result.context.location.text)

  // Test facets
  t.truthy(result.facets)
  t.truthy(result.facets.cluster)
  t.truthy(result.facets.types)
  t.truthy(result.facets.price)
  t.is(typeof result.facets.price.min, 'number')
  t.is(typeof result.facets.price.max, 'number')
  t.is(result.facets.price.min < result.facets.price.max, true)
  t.truthy(result.facets.spaceFacilities)
})
