function startUp () {
	if (localStorage['currentUser']) {
		// Load the user's sets
	} else {
		window.location.href = './index.html'
	}
}


console.log('Main page startup')
startUp()
console.log('Main page loaded')

/*
if (localStorage.getItem('currentUser')) {
	console.log(localStorage.getItem('currentUser'))
} else {
	console.log('no hay')
}
localStorage.removeItem('currentUser')
if (localStorage.getItem('currentUser')) {
	console.log('doesnt work')
} else {
	console.log('yes yes yes')
}
*/