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
// Get Data Models
require('../models/travels/Country')
require('../models/travels/City')
var Country = mongoose.model('Country');
var City = mongoose.model('City');
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
		if (countries.filter(value => value.name == country.name).length == 0) {countries.push(country)}
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

fastify.ready().then(
	async () => {
		try {
			const countries = await Country.insertMany(generateCountries())
			const countriesIds = countries.map(x => x._id)
			const cities = await City.insertMany(generateCities(countriesIds))
			console.log(`
      Data successfully added:
		- ${countries.length} countries added.
		- ${cities.length} cities added.
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

