let express = require("express")
let morgan = require("morgan")
var cryptojs = require("crypto-js");
let bcrypt = require('bcryptjs')
let mongoose = require("mongoose")
let bodyParser = require('body-parser')
let {RsetList, UserList} = require('./model')
const {DATABASE_URL, PORT} = require('./config')

let app = express()
app.use(express.static('public'))

let jsonParser = bodyParser.json()

app.use(morgan('dev'))

/* ===== LOGIN ===== */
app.post('/login', jsonParser, (req, res, next) => {
	let {username, password} = req.body
	if (!username || !password) {
		res.statusMessage = 'Missing field in body'
		return res.status('406').json({
			message: 'Missing field in body',
			status: 406
		})
	}
	UserList.get(username)
		.then(user => {
			if (user) {
				return bcrypt.compare(password, user.password)
			} else {
				res.statusMessage = 'Bad user'
				return res.status(401).json({
					message: 'Bad user',
					status: 404
				})
			}
		})
		.then(match => {
			if (match) {
				return res.status(200).json(req.body.username)
			} else {
				res.statusMessage = 'Bad credentials'
				return res.status(404).json({
					message: 'Bad credentials',
					status: 404
				})
			}
		})
		.catch(error => {
			res.statusMessage = 'Something went wrong'
			return res.status(500).json({
				status: 500,
				message: 'Something went wrong'
			})
		})
})
/* ===== LOGIN ===== */

/* ===== SIGNUP ===== */
app.post('/signup', jsonParser, (req, res, next) => {
	let username = req.body.username
	let password = req.body.password
	let cpassword = req.body.cpassword
	if (!username || !password || !cpassword) {
		res.statusMessage = 'Missing field in body'
		return res.status(406).json({
			message: 'Missing field in body',
			status: 406
		})
	}
	if (password.length < 8) {
		res.statusMessage = 'Password too short'
		return res.status(401).json({
			message: 'Password too short',
			status: 401
		})
	}
	if (!(password == cpassword)) {
		res.statusMessage = 'Passwords do not match'
		return res.status(400).json({
			message: 'Passwords do not match',
			status: 400
		})
	}
	UserList.get(username)
		.then(user => {
			if (user) {
				res.statusMessage = 'Duplicate username'
				return res.status(409).json({
					message: 'Duplicate username',
					status: 409
				})
			} else {
				return bcrypt.hash(password, 10)
			}
		})
		.then(hashPass => {
			UserList.register({username, password: hashPass})
				.then(user => {
					return res.status(200).json(user.username)
				})
				.catch(error => {
					res.statusMessage = 'Something went wrong'
					return res.status(500).json({
						status: 500,
						message: 'Something went wrong'
					})
				})
		})
		.catch(error => {
			res.statusMessage = 'Something went wrong'
			return res.status(500).json({
				status: 500,
				message: 'Something went wrong'
			})
		})
})
/* ===== SIGNUP ===== */

/* ===== MAIN ===== */
app.get('/mySets', jsonParser, (req, res, next) => {
	let username = req.query.username
	RsetList.getUser(username)
		.then(rsets => {
			return res.status(200).json(rsets)
		})
		.catch(error => {
			res.statusMessage = 'Something went wrong'
			return res.status(500).json({
				status: 500,
				message: 'Something went wrong'
			})
		})
})
/* ===== MAIN ===== */

/* ===== SETTINGS ===== */
app.post('/createSet', jsonParser, (req, res, next) => {
	let newRset = req.body
	RsetList.getDesc(newRset)
		.then(rset => {
			if (rset) {
				res.statusMessage = 'Duplicate description'
				return res.status(409).json({
					message: 'Duplicate description',
					status: 409
				})
			} else {
				RsetList.create(newRset)
				.then(rset => {
					return res.status(201).json({status: 201})
				})
				.catch(error => {
					res.statusMessage = 'Something went wrong'
					return res.status(500).json({
						status: 500,
						message: 'Something went wrong'
					})
				})
			}
		})
		.catch(error => {
				res.statusMessage = 'Something went wrong'
				return res.status(500).json({
				status: 500,
				message: 'Something went wrong'
			})
		})
})

app.put('/editSet', jsonParser, (req, res, next) => {
	let toUpdate = req.body
	RsetList.edit(toUpdate)
		.then(rset => {
			return res.status(200).json({status: 200})
		})
		.catch(error => {
				res.statusMessage = 'Something went wrong'
				return res.status(500).json({
				status: 500,
				message: 'Something went wrong'
			})
		})
})
/* ===== SETTINGS ===== */

/* ===== PROFILE ===== */
app.delete('/deleteSet', jsonParser, (req, res, next) => {
	let {ownedBy, description} = req.body
	RsetList.delete(ownedBy, description)
		.then(rset => {
			return res.status(200).json({status: 200})
		})
		.catch(error => {
				res.statusMessage = 'Something went wrong'
				return res.status(500).json({
				status: 500,
				message: 'Something went wrong'
			})
		})
})
/* ===== PROFILE ===== */


let server;
function runServer (port, databaseUrl) {
	return new Promise( (resolve, reject) => {
		mongoose.connect(databaseUrl, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
			if (err) {
				return reject(err)
			} else {
				server = app.listen(port, () => {
					console.log("App is running on port " + port)
					resolve()
				})
				.on('error', err => {
					mongoose.disconnect()
					return reject(err)
				})
			}
		})
	})
}

function closeServer(){
 return mongoose.disconnect()
 	.then(() => {
 		return new Promise((resolve, reject) => {
 			console.log('Closing the server')
 			server.close( err => {
 				if (err) {
 					return reject(err)
 				} else {
 					resolve()
 				}
 			})
 		})
 	})
}

runServer(PORT, DATABASE_URL)
	.catch( err => {
		console.log(err)
	})

module.exports = {app, runServer, closeServer}