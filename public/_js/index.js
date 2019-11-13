function startUp () {
	handleLogin()
}

function handleLogin () {
	let loginButton = $('#login .btn-dark')
	$(loginButton).on('click', (e) => {
		e.preventDefault()
		let userText = $('#tfUsername')
		let userPass = $('#pwd')
		let username = $(userText).val()
		let password = $(userPass).val()
		if (!username || !password) {
			if (!username) {
				$(userText).addClass('is-invalid')
			}
			if (!password) {
				$(userPass).addClass('is-invalid')
			}
			return
		}
		let info = {
			username: username,
			password: password
		}
		$.ajax({
			url: '/login',
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(info),
			method: "POST",
			success: (responseJSON) => {
				console.log(responseJSON)
				localStorage.setItem('currentUser', responseJSON.username)
				window.location.href = './main.html'
			},
			error: (err) => {
				console.log(err.statusText)
			}
		})
	})
}

console.log('Login screen startup')
startUp()
console.log('Login screen loaded')