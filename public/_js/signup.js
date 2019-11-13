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
		if (!username || !password || !cpassword) {
			console.log('nope')
			return
		}
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
			success: (responseJSON) => {
				console.log(responseJSON)
			},
			error: (err) => {
				console.log(err.statusText)
			}
		})
	})
}

console.log('Signup page startup')
startUp()
console.log('Signup page loaded')