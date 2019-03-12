
const express = require('express')
const { Client } = require('pg')
const connectionString = 'postgresql://johnathanredd:@localhost:5432/RestaurantDatabase'
const client = new Client({ connectionString })
const bodyparser = require('body-parser')
const cors = require('cors')

const PORT = 9000

let app = express()

client.connect().then(() => {
	console.log('connection to postgres succesful!')
})

app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }))

const query = 'SELECT longitude, latitude, name, location_name, description, image FROM "location" AS coordinates INNER JOIN restaurants ON coordinates.location_id = restaurants.location_foreign_key '
const query2 = 'SELECT name, location_name, longitude, latitude FROM restaurants, "location" WHERE location_foreign_key = location_id'

// This is for selecting a movie from the database
app.get('/restaurants', (request, response) => {
	client.query(query).then(result => {
		response.send(result.rows)
	}).catch(error =>{
		console.log(error.stack)
	})
})

app.get('/locations', (request, response) => {
	client.query(query2).then(result => {
		response.send(result.rows)
	}).catch(error => {
		console.log(error.stack)
	})
})


app.listen(PORT, function() {
  console.log('My server is set up and running on port: ', PORT);
})
