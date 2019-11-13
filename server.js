require('dotenv').config({path: 'variables.env'})
let express = require("express")
let morgan = require("morgan")
var cryptojs = require("crypto-js");
//let mongoose = require("mongoose")
let bodyParser = require('body-parser')
const PORT = require('./config')

let app = express()
app.use(express.static('public'))

let jsonParser = bodyParser.json()

let users = [
	{
		username: "test",
		password: "1234",
		sets: []
	}
]

app.use(morgan('dev'))

/* ===== LOGIN ===== */
app.post('/login', jsonParser, (req, res, next) => {
	let username = req.body.username
	let password = req.body.password
	if (!username || !password) {
		res.statusMessage = 'Missing field in body'
		return res.status('406').json({
			message: 'Missing field in body',
			status: 406
		})
	}
	for (let i = 0; i < users.length; i++) {
		if (users[i].username == username) {
			if (users[i].password == password) {
				return res.status(200).json(req.body)
			}
		}
	}
	res.statusMessage = 'Credentials not found'
	return res.status('404').json({
		message: 'Credentials not found',
		status: 406
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
		return res.status('406').json({
			message: 'Missing field in body',
			status: 406
		})
	}
	console.log(username)
})

/* ===== SIGNUP ===== */

app.listen(8080, () => {
	console.log(`App is running on port ${8080}`)
})

/*
	let cipherPass = cryptojs.AES.encrypt(password, process.env['ENCRYPT_KEY'])
	console.log(cipherPass.toString())
	let uncipherBytes = cryptojs.AES.decrypt(cipherPass, process.env['ENCRYPT_KEY'])
	let newPass = uncipherBytes.toString(cryptojs.enc.Utf8);
*/