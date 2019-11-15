let userSets

function startUp () {
	if (!localStorage['currentUser']) {
		window.location.href = './index.html'
	}
	getSets()
}

function getSets () {
	$.ajax({
		url: `/mySets?username=${localStorage['currentUser']}`,
		dataType: "json",
		contentType: "application/json",
		method: "GET",
		success: (rsets) => {
			userSets = rsets
		},
		error: (err) => {
			console.log(err.statusMessage)
		}
	})
		.then( () => {
			loadSets(userSets)
		})
}

function loadSets (userSets) {
	let sidebar = $('#sidebar')
	for (let i = 0; i < userSets.length; i++){
		let currentCard = $(`<div class="card text-center" id="rset${i}">
								<div class="card-body">
									<h5 class="card-title">
										${userSets[i].description}
									</h5>
								</div>
							 </div>`)
		currentCard.data('rset', userSets[i])
		$(sidebar).append(currentCard)
	}
}
console.log('Main page startup')
startUp()
console.log('Main page loaded')