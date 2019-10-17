const mongoose = require('mongoose');
const Country = mongoose.model('Country');

const resolvers = {
    Query: {
      country: (root, {slug}) => {
        return Country.findOne({slug: slug});
      },
      countries: () => {
        return Country.find();
      },
    }
};

export default resolvers;