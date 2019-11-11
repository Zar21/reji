const Restaurant = {
    city: ({ id }, args, context) => {
      return context.prisma.restaurant({ id }).city();
    }
  }

module.exports = {
    Restaurant,
}