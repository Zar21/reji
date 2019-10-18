const mongoose = require('mongoose');
const Adventure = mongoose.model('Adventure');
//const City = mongoose.model('City');

const resolvers = {
    Query: {
      adventure: (root, {slug}) => {
        return Adventure.findOne({slug: slug});
      },
      adventures: () =>  {
        return Adventure.find();
      }
    },
};

export default resolvers;