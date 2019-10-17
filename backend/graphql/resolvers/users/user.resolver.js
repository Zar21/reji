const mongoose = require('mongoose');
const User = mongoose.model('User');

const resolvers = {
    Query: {
      user: (root, {username}) => {
        return User.findOne({username: username});
      },
      users: () => {
        return User.find();
      },
    }
};

export default resolvers;