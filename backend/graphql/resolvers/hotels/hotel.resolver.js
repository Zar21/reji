const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');
const City = mongoose.model('City');

const resolvers = {
    Query: {
        hotel: (root, {slug}) => {
            return Hotel.findOne({slug: slug});
        },
        hotels: () => {
            return Hotel.find();
        },
        hotelsResults: async function(root, {slug}) {
          let city = await City.findOne({slug: slug});
          return Hotel.find({city: city._id});
        }
    },
    Hotel: {
      city: (parent) => {
        console.log(parent)
        return City.findOne({_id: parent.city});
      }
    }
};

export default resolvers;