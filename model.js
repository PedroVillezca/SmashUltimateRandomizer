let mongoose = require('mongoose')

mongoose.Promise = global.Promise

let rsetSchema = mongoose.Schema({
	description: {type: String, required: true},
	characters: [Boolean],
	skinsOn: {type: Boolean},
	skins: [{
		character: {type: Number},
		enabled: [Number]
	}],
	stages: [Boolean],
	omegasOn: {type: Boolean},
	omegas: [Boolean],
	battlefieldsOn: {type: Boolean},
	battlefields: [Boolean],
	tags: [String],
	isPublic: {type: Boolean, required: true},
	ownedBy: {type: String, required: true},
	downloads: {type: Number},
	privateLocked: {type: Boolean, required: true}
}, {collection: 'rsets'})

let userSchema = mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
}, {collection: 'users'})

let Rset = mongoose.model('Rset', rsetSchema)
let User = mongoose.model('User', userSchema)

let RsetList = {
	getAll: function() {
		return Rset.find({})
			.then( rsets => {
				return rsets
			})
			.catch( error => {
				throw Error(error)
			})
	},
	getDesc: function(rset) {
		return Rset.findOne({
			"description": rset.description,
			"ownedBy": rset.ownedBy
		})
			.then(rset => {
				return rset
			})
			.catch(error => {
				throw Error(error)
			})
	},
	getUser: function(username) {
		return Rset.find({"ownedBy": username})
			.then(rsets => {
				return rsets
			})
			.catch(error => {
				throw Error(error)
			})
	},
	create: function(rset) {
		return Rset.create(rset)
			.then(rset => {
				return rset
			})
			.catch(error => {
				throw Error(error)
			})
	}
}

let UserList = {
	get: function(username) {
		return User.findOne({"username": username})
			.then(user => {
				return user
			})
			.catch(error => {
				throw Error(error)
			})
	},
	register: function(newUser) {
		return User.create(newUser)
			.then(user => {
				return user
			})
			.catch(error => {
				throw Error(error)
			})
	}
}

module.exports = {RsetList, UserList}