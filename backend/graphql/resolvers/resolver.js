import { merge } from 'lodash';

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
import UserResolvers from "../../graphql/resolvers/users/user.resolver";

const resolvers = merge(
  QueryResolvers,
  RestaurantResolvers,
  CountryResolvers,
  CityResolvers,
  HotelResolvers,
  RoomResolvers,
  AdventureResolvers,
  UserResolvers
);

export default resolvers;