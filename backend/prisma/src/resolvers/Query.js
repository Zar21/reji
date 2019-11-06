async function restaurant(parent, { id }, context) {
  return context.prisma.restaurant({ id })
}

async function restaurants(parent, args, context) {
  return context.prisma.restaurants({})
}

async function city(parent, { id }, context) {
  return context.prisma.city({ id })
}

async function cities(parent, args, context) {
  return context.prisma.cities({})
}

async function country(parent, { id }, context) {
  return context.prisma.country({ id })
}

async function countries(parent, args, context) {
  return context.prisma.contries({})
}

module.exports = {
  restaurant,
  restaurants,
  city,
  cities,
  country,
  countries,
}