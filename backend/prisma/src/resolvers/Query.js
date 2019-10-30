async function restaurant(parent, { id }, context) {
  return context.prisma.restaurant({ id })
}

async function restaurants(parent, args, context) {
  return context.prisma.restaurants({})
}

module.exports = {
  restaurant,
  restaurants,
}
