const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const Product = mongoose.model('Product');
const Hotel = mongoose.model('Hotel');
const Room = mongoose.model('Room');
const City = mongoose.model('City');

const resolvers = {
  Query: {
      restaurant: (root, {slug}) => {
        return Restaurant.findOne({slug: slug});
      },
      restaurants: () => {
        return Restaurant.find();
      },
      product: (root, {slug}) => {
        return Product.findOne({slug: slug});
      },
      products: () =>  {
        return Product.find();
      },
      hotel: (root, {slug}) => {
        return Hotel.findOne({slug: slug});
      },
      hotels: () => {
        return Hotel.find();
      },
      room: (root, {slug}) => {
        return Room.findOne({slug: slug});
      },
      rooms: () => {
        return Room.find();
      },
      city: (root, {slug}) => {
        return City.findOne({slug: slug});
      },
      cities: () => {
        return City.find();
      },
      message: () => 'Hello World!'
  },
  // https://reactgo.com/nested-resolvers-relationaldata-graphql/
  Restaurant: {
    city: (parent) => {
      return City.findOne({_id: parent.city});
    }
  }
}

export default resolvers;
