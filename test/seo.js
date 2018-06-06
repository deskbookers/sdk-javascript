import dotenv from 'dotenv'
import 'fetch-everywhere'
import test from 'ava'
import Deskbookers from '../src'
dotenv.load()

const {
  API_SEO_HOST,
  API_SEO_PATH,
  API_HTTPS,
  API_HOST
} = process.env

async function client () {
  const deskbookers = new Deskbookers({
    https: API_HTTPS === 'true',
    host: API_HOST,
    sources: {
      seo: {
        host: API_SEO_HOST,
        path: API_SEO_PATH
      }
    }
  })

  return deskbookers
}

test('overviewMainCities', async t => {
  // Prepare API
  const deskbookers = await client()
  const result = await deskbookers.seo.overviewMainCities('nl-nl')

  t.truthy(Array.isArray(result))
  t.truthy(result.length > 0)
  for (const item of result) {
    t.is(item._type, 'type')
    t.is(item.lang, 'nl-nl')
    t.is(typeof item.slug, 'string')
    t.is(typeof item.name, 'string')
    t.truthy(Array.isArray(item.children))
    t.truthy(item.children.length > 0)
    for (const child of item.children) {
      t.is(child._type, 'main-city')
      t.is(child.lang, 'nl-nl')
      t.is(typeof child.slug, 'string')
      t.is(child.slug.indexOf(`${item.slug}/`), 0)
      t.is(typeof child.name, 'string')
    }
  }
})

test('crumbs', async t => {
  // Prepare API
  const deskbookers = await client()

  const result1 = await deskbookers.seo.crumbs({
    lang: 'nl-nl',
    type: 'flex',
    cityId: 2759794 // Amsterdam
  })

  const result2 = await deskbookers.seo.crumbs({
    lang: 'nl-nl',
    typeSlug: 'flexwerken-flexibele-werkplek',
    cityId: 2759794 // Amsterdam
  })

  const result3 = await deskbookers.seo.crumbs({
    lang: 'nl-nl',
    type: 'flex',
    citySlug: 'amsterdam'
  })

  const result4 = await deskbookers.seo.crumbs({
    lang: 'nl-nl',
    type: 'flex',
    cityName: 'Amsterdam',
    cityCoordinate: { lat: 52.3546274, lng: 4.8285839 }
  })

  t.truthy(result1)
  t.truthy(result2)
  t.truthy(result3)
  t.truthy(result4)
  t.deepEqual(result1, result2)
  t.deepEqual(result2, result3)
  t.deepEqual(result3, result4)
})
