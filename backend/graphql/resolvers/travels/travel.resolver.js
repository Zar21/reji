const mongoose = require('mongoose');
const Travel = mongoose.model('Travel');
const City = mongoose.model('City');

const resolvers = {
    Query: {
        travel: (root, {slug}) => {
            return Travel.findOne({slug: slug})
          },
          travels: () => {
            return Travel.find();
          },
    },
    Travel: {
        destination: (parent) => {
          return City.findOne({_id: parent.destination});
        },
        exit: (parent) => {
          return City.findOne({_id: parent.exit});
        }
      }
};

export default resolvers;