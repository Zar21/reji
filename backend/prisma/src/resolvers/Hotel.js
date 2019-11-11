const Hotel = {
    city: ({ id }, args, context) => {
      return context.prisma.hotel({ id }).city();
    }
  }

module.exports = {
    Hotel,
}