function createRestaurant(parent, args, context, info) {
  return context.prisma.createRestaurant({
    title: args.title,
    reservePrice: args.reservePrice,
    slug: args.slug,
    description: args.description,
    city: args.city,
    streetAddress: args.streetAddress,
    image: args.image
  })
}

module.exports = {
  createRestaurant,
}
