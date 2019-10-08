const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');

const resolvers = {
  Query: {
      restaurant: (root, {slug}) => {
          return Restaurant.findOne({slug: slug});
      },
      restaurants: () => {
          return Restaurant.find();
      },
      message: () => 'Hello World!'
  }
}

export default resolvers;
