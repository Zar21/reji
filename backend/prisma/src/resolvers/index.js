const Query = require('./Query')
const Mutation = require('./Mutation')
const { City } = require("./City")
const { Restaurant } = require("./Restaurant")
const { Hotel } = require("./Hotel")
const resolvers = {
  Query,
  Mutation,
  City,
  Restaurant,
  Hotel,
}

module.exports = {
    resolvers,
}