const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');

const resolver = {
  restaurant: (args) => {
    let slug = args.slug;
    return Restaurant.findOne({slug: slug});
  },
  restaurants: () => {
    return Restaurant.find();
  },
  message: () => 'Hello World!'
}

export default resolver;
