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
	isPublic: {type: Boolean}
})

let userSchema = mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	rsets: [String]
})

let Rset = mongoose.model('Rset', setSchema)
let User = mongoose.model('User', userSchema)

let RsetList = {

	/*
	get: function(){
		return Student.find({})
			.then( students => {
				return students
			})
			.catch( error => {
				throw Error(error)
			})
	}
	*/
}

let UserList = {

}

module.exports = {RsetList, UserList}