const mongoose = require('mongoose');
const Room = mongoose.model('Room');

const resolvers = {
    Query: {
      room: (root, {slug}) => {
        return Room.findOne({slug: slug});
      },
      rooms: () => {
        return Room.find();
      }
    }
}

export default resolvers;