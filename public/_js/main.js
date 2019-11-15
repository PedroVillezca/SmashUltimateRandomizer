let userSets
let characterFolders = ["01", "02", "03", "04", "04e", "05", "06", "07", 
						"08", "09", "10", "11", "12", "13", "13e", "14",
						"15", "16", "17", "18", "19", "20", "21", "21e",
						"22", "23", "24", "25", "25e", "26", "27",
						"28", "28e", "29", "30", "31", "32", "33-35",
						"36", "37", "38", "39", "40", "41", "42", "43",
						"44", "45", "46", "47", "48", "49", "50", "51",
						"52", "53", "54", "55", "56", "57", "58", "59",
						"60", "60e", "61", "62", "63", "64", "65", "66",
						"66e", "67", "68", "69", "70", "71"]
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
	handleRandomizer()
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

function handleRandomizer () {
	let btRandomize = $('#btRandomize')
	$(btRandomize).on('click', (e) => {
		randomize()
	})
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

function randomize () {
	// Randomize
	let enabledCharacters = []
	for (let i = 0; i < characters.length; i++) {
		if (characters[i]) {
			enabledCharacters.push(i)
		}
	}
	let characterIndex = enabledCharacters[randomIntFromInterval(0, enabledCharacters.length-1)]
	let selectedCharacter = characterFolders[characterIndex]
	let selectedSkin = 1
	if (skinsOn) {
		for (let i = 0; i < skins.length; i++) {
			if (skins[i].character == characterIndex) {
				selectedSkin = skins[i].enabled[randomIntFromInterval(0, skins[i].enabled.length-1)]
			}
		}
	}

	// Display results
	let characterImg = $('#characterImg')
	$(characterImg).attr('src', `./_assets/_renders/${selectedCharacter}/0${selectedSkin}.png`)
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log('Main page startup')
startUp()
console.log('Main page loaded')