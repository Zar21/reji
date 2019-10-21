const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const City = mongoose.model('City');

const resolvers = {
    Query: {
        restaurant: (root, {slug}) => {
          return Restaurant.findOne({slug: slug}).exec();
        },
        restaurants: (root, {limit, offset}) => {
          return Restaurant.find().skip(offset).limit(limit).exec();
        },
        restaurantsCount: () => {
          return Restaurant.count().exec();
        }
    },
    Mutation: {
        createRestaurant: (root, {input}) => {
            const restaurant = new Restaurant(input);
    
            // no .exec();
            restaurant.save();
            return restaurant;
        }
    },
    Restaurant: {
        city: (parent) => {
            return City.findOne({_id: parent.city}).exec();
        }
    }
};

export default resolvers;

/*

// Example of mutation

mutation createRestaurants {
  createRestaurant(input:{
    title: "Kunze - Schmitt12313",
    description: "Optimized multimedia instruction set",
    streetAddress: "4375 Gleichner Isle",
    city: "5da87b1e837dc98302778519",
    reservePrice: 403
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

query getRestaurants {
  restaurant(slug:"kunze-schmitt2-edf43p") {
    id
    title
    slug
    description
    streetAddress
    reservePrice
    city {
      id
      slug
      name
      country {
        id
        slug
        name
      }
    }
  }
}
*/