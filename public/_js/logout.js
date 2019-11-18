function startUp () {
	let logoutButton = $('#logoutButton')
	$(logoutButton).on('click', (e) => {
		e.preventDefault()
		localStorage.removeItem('currentUser')
		window.location.href = './index.html'
	})
}

console.log('Loading logout functionality')
startUp()
console.log('Logout functionality loaded')