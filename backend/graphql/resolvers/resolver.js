const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const Product = mongoose.model('Product');
const Hotel = mongoose.model('Hotel');
const Room = mongoose.model('Room');
const City = mongoose.model('City');
const Country = mongoose.model('Country');

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
      country: (root, {slug}) => {
        return Country.findOne({slug: slug});
      },
      countries: () => {
        return Country.find();
      },
      message: () => 'Hello World!'
  },
  // https://reactgo.com/nested-resolvers-relationaldata-graphql/
  Restaurant: {
    city: (parent) => {
      return City.findOne({_id: parent.city});
    }
  },
  City: {
    country: (parent) => {
      return Country.findOne({_id: parent.country});
    }
  },
  Hotel: {
    city: (parent) => {
      return City.findOne({_id: parent.city});
    }
  },
  Mutation: {
    createRestaurant: (root, {input}) => {
      const restaurant = new Restaurant(input);

      restaurant.save();
      return restaurant;
    }
  }
}

export default resolvers;



/*

// Example of mutation

mutation createRestaurants {
  createRestaurant(input:{
    title:"mutationTest"
  }) {
    id
    title
    slug
  }
}

*/

/*

// Example of query
// query keyword is optional but good practice
// maybe relevant when implementing in code

query getRestaurants{
  restaurant (slug:"barrows-turner-and-stroman-o2gjnx") {
    id
    title
    slug
    description
    streetAddress
    city {
      id
      slug
    }
  }
}
*/