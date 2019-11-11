async function restaurant(parent, { slug }, context) {
  let restaurants = await context.prisma.restaurants()
  return getOne(restaurants, slug)
}

async function restaurants(parent, { limit }, context) {
  if (limit) {
    return context.prisma.restaurants({first: limit})
  }
  return context.prisma.restaurants({})
}

async function city(parent, { slug }, context) {
  let cities = await context.prisma.cities()
  return getOne(cities, slug)
}

async function cities(parent, args, context) {
  return context.prisma.cities({})
}

async function country(parent, { slug }, context) {
  let countries = await context.prisma.countries()
  return getOne(countries, slug)
}

async function countries(parent, args, context) {
  return context.prisma.countries({})
}

async function adventure(parent, { slug }, context) {
  let adventures = await context.prisma.adventures()
  return getOne(adventures, slug)
}

async function adventures(parent, { limit }, context) {
  return context.prisma.adventures({first: limit})
}

async function hotel(parent, { slug }, context) {
  let hotels = await context.prisma.hotels()
  return getOne(hotels, slug)
}

async function hotels(parent, { limit }, context) {
  return context.prisma.hotels({first: limit})
}

function getOne(data, slug) {
    return data.find(obj => obj.slug == slug)
}

module.exports = {
  restaurant,
  restaurants,
  city,
  cities,
  country,
  countries,
  adventure,
  adventures,
  hotel,
  hotels,
}