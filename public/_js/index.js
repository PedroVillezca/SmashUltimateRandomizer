function startUp () {
	handleLogin()
}

function handleLogin () {
	let loginButton = $('#login .btn-dark')
	$(loginButton).on('click', (e) => {
		e.preventDefault()
		let userText = $('#tfUsername')
		let userPass = $('#pwd')
		let username = sanitizeString($(userText).val())
		let password = sanitizeString($(userPass).val())
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
			success: (username) => {
				localStorage.setItem('currentUser', username)
				window.location.href = './main.html'
			},
			error: (err) => {
				if (err.statusText == 'Bad user') {
					userText.addClass('is-invalid')
				} else {
					userText.removeClass('is-invalid')
				}
				if (err.statusText == 'Bad credentials') {
					userPass.addClass('is-invalid')
				} else {
					userPass.removeClass('is-invalid')
				}
			}
		})
	})
}

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}

console.log('Login screen startup')
startUp()
console.log('Login screen loaded')