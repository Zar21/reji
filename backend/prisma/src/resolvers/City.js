const City = {
    country: ({ id }, args, context) => {
      return context.prisma.city({ id }).country();
    }
  }

module.exports = {
    City,
}