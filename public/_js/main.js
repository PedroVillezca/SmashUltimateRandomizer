let userSets
/* ===== CURRENT SET ===== */
// Arrays
let characters
let skins
let stages
let omegas
let battlefields


// Variables
let skinsOn
let OmegasOn
let battlefieldsOn
/* ===== CURRENT SET ===== */

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
			handleSets()
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
	chooseSet(userSets[0])
}

function handleSets () {
	let sets = $('#sidebar .card')
	for (let i = 0; i < sets.length; i++) {
		$(sets[i]).on('click', (e) => {
			e.preventDefault()
			chooseSet($(sets[i]).data('rset'))
		})
	}
}

function chooseSet (rset) {
	characters = rset.characters
	skinsOn = rset.skinsOn
	if (skinsOn) {
		skins = rset.skins
	} else {
		skins = []
	}
	stages = rset.stages
	omegasOn = rset.omegasOn
	if (omegasOn) {
		omegas = rset.omegas
	} else {
		omegas = []
	}
	battlefieldsOn = rset.battlefieldsOn
	if (battlefieldsOn) {
		battlefields = rset.battlefields
	} else {
		battlefields = []
	}
	let currentTitle = $('#main .current-set-title')
	currentTitle.html(rset.description)
}


console.log('Main page startup')
startUp()
console.log('Main page loaded')