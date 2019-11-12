let mongoose = require('mongoose')

mongoose.Promise = global.Promise

let rsetSchema = mongoose.Schema({
	description: {type: String, required: true},
	characters: [Boolean],
	skinsOn: {type: Boolean},
	skins: [{
		character: {type: String},
		enabled: [Boolean]
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
	rsets: [String]
})

let Rset = mongoose.model('Rset', setSchema)
let User = mongoose.model('User', userSchema)

let StudentList = {
	get: function(){
		return Student.find({})
			.then( students => {
				return students
			})
			.catch( error => {
				throw Error(error)
			})
	},
	post: function(newStudent) {
		return Student.create(newStudent)
			.then(student => {
				return student;
			})
			.catch(error => {
				throw Error(error)
			})
	},
	findById: function (id) {
		return Student.findOne({"id": id})
			.then (students => {
				return students
			})
			.catch ( error => {
				throw Error(error)
			})
	},
	updateStudent: function (id, firstName, lastName) {
		return Student.findOneAndUpdate({"id": id}, {$set: {
			"firstName": firstName,
			"lastName": lastName
		}}, {new: true})
			.then (student => {
				return student
			})
			.catch ( error => {
				throw Error(error)
			})
	},
	deleteStudent: function (id) {
		return Student.findOneAndRemove({"id": id})
			.then( student => {
				return student
			})
			.catch (error => {
				throw Error(error)
			})
	}
}

module.exports = {StudentList}