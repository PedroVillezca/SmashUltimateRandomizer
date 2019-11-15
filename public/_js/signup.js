function startUp () {
	handleSignup()
}


function handleSignup () {
	let signupButton = $('#signup .btn-dark')
	$(signupButton).on('click', (e) => {
		e.preventDefault()
		let userText = $('#newUsername')
		let userPass = $('#newPwd')
		let userConf = $('#confPwd')
		let username = $(userText).val()
		let password = $(userPass).val()
		let cpassword = $(userConf).val()
		let info = {
			username: username,
			password: password,
			cpassword: cpassword
		}
		$.ajax({
			url: '/signup',
			dataType: "json",
			contentType: "application/json",
			data: JSON.stringify(info),
			method: "POST",
			success: (username) => {
				localStorage.setItem('currentUser', username)
				window.location.href = './main.html'
			},
			error: (err) => {
				let errorText = $('#signup .error-text')
				if (err.status == 406) {
					$(errorText).html('Please fill in all fields')
				} else if (err.status == 400) {
					$(errorText).html('Passwords do not match')
				} else if (err.status == 409){
					$(errorText).html('That username is taken')
				} else if (err.status == 401) {
					$(errorText).html('Password must be at least 8 characters long')
				}
				errorText.removeClass('unloaded')
			}
		})
	})
}

console.log('Signup page startup')
startUp()
console.log('Signup page loaded')