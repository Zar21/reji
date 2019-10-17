const mongoose = require('mongoose');
const Adventure = mongoose.model('Adventure');

const resolvers = {
    Query: {
      adventure: (root, {slug}) => {
        return Adventure.findOne({slug: slug});
      },
      adventures: () =>  {
        return Adventure.find();
      }
    },
    Hotel: {
      city: (parent) => {
        return City.findOne({_id: parent.city});
      }
    }
};

export default resolvers;