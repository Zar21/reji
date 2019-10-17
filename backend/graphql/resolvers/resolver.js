// Pagination
// https://codeburst.io/graphql-pagination-by-example-part-1-15ec3313ae08
// https://codeburst.io/graphql-pagination-by-example-part-2-2803802ef23a

// Nested resolvers
// https://reactgo.com/nested-resolvers-relationaldata-graphql/

const QueryResolvers = {
  Query: {
      message: () => 'Hello World!'
  }
}


import RestaurantResolvers from "../../graphql/resolvers/restaurants/restaurant.resolver";
import CountryResolvers from "../../graphql/resolvers/travels/country.resolver";
import CityResolvers from "../../graphql/resolvers/travels/city.resolver";
import HotelResolvers from "../../graphql/resolvers/hotels/hotel.resolver";
import RoomResolvers from "../../graphql/resolvers/hotels/room.resolver";
import AdventureResolvers from "../../graphql/resolvers/adventures/adventures.resolver";


const resolvers = [
  QueryResolvers,
  RestaurantResolvers,
  CountryResolvers,
  CityResolvers,
  HotelResolvers,
  RoomResolvers,
  AdventureResolvers
];

export default resolvers;