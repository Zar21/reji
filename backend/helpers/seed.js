// Import external dependancies
const faker = require('faker')
const boom = require('boom')
const fastify = require('fastify')({
	logger: true
})
const mongoose = require('mongoose')

// Connect to DB
mongoose
	.connect('mongodb://localhost/conduit_nodejs')
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err))


// IMPORT MODELS
// travels
require('../models/travels/Country')
require('../models/travels/City')
// hotels
require("../models/hotels/Hotel");

// CREATE MODELS
var Country = mongoose.model('Country');
var City = mongoose.model('City');
// hotels
var hotel = mongoose.model("Hotel");

// Fake data generation functions
const generateCountries = () => {
	let countries = []
	let i = 0

	while (i < 50) {
		const name = faker.fake('{{address.country}}')

		const country = {
			name
		}
		//This if check if some country are already in the array 
		if (countries.filter(value => value.name == country.name).length == 0) { countries.push(country) }
		i++
	}

	return countries
}

const generateCities = (countriesIds) => {
	let cities = []
	let i = 0

	while (i < 50) {
		const name = faker.fake('{{address.city}}')
		const latitude = faker.fake('{{address.latitude}}')
		const longitude = faker.fake('{{address.longitude}}')
		const country = faker.random.arrayElement(countriesIds)
		const city = {
			name,
			latitude,
			longitude,
			country
		}
		//This if check if some city are already in the array
		if (cities.filter(value => value.name == city.name).length == 0) {
			cities.push(city)
		}
		i++
	}

	return cities
}

// HOTELS FAKE DATA
// TODO:jordi: test this
// const generateHotels = (cities) => {
// 	let hotels = [];
// 	let i = 0;

// 	for (let i = 0; i < 2; i++) {
// 		const name = faker.fake("{{lorem.slug}}");
// 		const description = faker.fake("{{lorem.sentence}}");
// 		const city = faker.random.arrayElement(cities);
// 		// let tempDate = faker.fake("{{date.future}}");
// 		const inDate = faker.fake("{{date.future}}");
// 		const outDate = faker.fake("{{date.future}}");
// 		const stars = faker.fake("{{random.number}}");
// 		const reviewScore = faker.fake("{{random.number}}");
// 		let features = [];
// 		// generate features
// 		for (let j = 0; j < Math.round(Math.random() * 5) +1; j++) {
// 			features.push(faker.fake("{{lorem.word}}"));
			
// 		}
// 		const rooms = faker.fake("{{random.number}}");
// 		let services = [];
// 		// generate services
// 		for (let j = 0; j < Math.round(Math.random() * 5) +1; j++) {
// 			services.push(faker.fake("{{lorem.word}}"));
			
// 		}

// 		const hotel = {
// 			name, description, city, inDate, outDate, stars, reviewScore, features, rooms, services
// 		}

// 		if (hotels.filter(value => value.name == hotel.name).length == 0) {
// 			hotels.push(hotel);
// 		}
// 	}

// 	return hotels;
// }

fastify.ready().then(
	async () => {
		try {
			const countries = await Country.insertMany(generateCountries())
			const countriesIds = countries.map(x => x._id)
			const cities = await City.insertMany(generateCities(countriesIds))
			// hotels
			// const cities_to_use_in_hotels = cities.map(x => x._id)
			// console.log(generateHotels(cities_to_use_in_hotels));
			// const hotels = await hotel.insertMany(generateHotels(cities_to_use_in_hotels))
			console.log(`
      Data successfully added:
		- ${countries.length} countries added.
		- ${cities.length} cities added.
		- ${hotels.length} hotels added.
      `)
		} catch (err) {
			throw boom.boomify(err)
		}
		process.exit()
	},
	err => {
		console.log('An error occured: ', err)
		process.exit()
	}
)

