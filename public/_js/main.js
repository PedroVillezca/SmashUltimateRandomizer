let characterNames = ["Mario", "Donkey Kong", "Link", "Samus",
					  "Dark Samus", "Yoshi", "Kirby", "Fox",
					  "Pikachu", "Luigi", "Ness", "Captain Falcon",
					  "Jigglypuff", "Peach", "Daisy", "Bowser",
					  "Ice Climbers", "Sheik", "Zelda", "Dr. Mario",
					  "Pichu", "Falco", "Marth", "Lucina", "Young Link",
					  "Ganondorf", "Mewtwo", "Roy", "Chrom",
					  "Mr. Game & Watch", "Meta Knight", "Pit",
					  "Dark Pit", "Zero Suit Samus", "Wario", "Snake",
					  "Ike", "Pokemon Trainer", "Diddy Kong", "Lucas",
					  "Sonic", "King Dedede", "Olimar", "Lucario",
					  "R.O.B.", "Toon Link", "Wolf", "Villager",
					  "Mega Man", "Wii Fit Trainer", "Rosalina & Luma",
					  "Little Mac", "Greninja", "Mii Brawler",
					  "Mii Swordfighter", "Mii Gunner", "Palutena",
					  "PAC-MAN", "Robin", "Shulk", "Bowser Jr.",
					  "Duck Hunt", "Ryu", "Ken", "Cloud", "Corrin",
					  "Bayonetta", "Inkling", "Ridley", "Simon",
					  "Richter", "King K. Rool", "Isabelle", "Incineroar",
					  "Piranha Plant", "Joker"]

let stageNames = ["Battlefield", "Big Battlefield", "Final Destination",
				  "Peach's Castle", "Kongo Jungle", "Hyrule Castle",
				  "Super Happy Tree", "Dreamland", "Saffron City",
				  "Mushroom Kingdom", "Princess Peach's Castle",
				  "Rainbow Cruise", "Kongo Falls", "Jungle Japes",
				  "Great Bay", "Temple", "Brinstar",
				  "Yoshi's Island (Melee)", "Yoshi's Story",
				  "Fountain of Dreams", "Green Greens", "Corneria",
				  "Venom", "Pokemon Stadium", "Onett",
				  "Mushroom Kingdom II", "Brinstar Depths", "Big Blue",
				  "Fourside", "Delfino Plaza", "Mushroomy Kingdom",
				  "Figure-8 Circuit", "WarioWare, Inc.",
				  "Bridge of Eldin", "Norfair", "Frigate Orpheon",
				  "Yoshi's Island", "Halberd", "Lylat Cruise",
				  "Pokemon Stadium 2", "Port Town Aero Dive",
				  "Castle Siege", "Distant Planet", "Smashville",
				  "New Pork City", "Summit", "Skyworld",
				  "Shadow Moses Island", "Luigi's Mansion",
				  "Pirate Ship", "Spear Pillar", "75 m", "Mario Bros.",
				  "Hanenbow", "Green Hill Zone", "3D Land",
				  "Golden Plains", "Paper Mario", "Gerudo Valley",
				  "Spirit Train", "Dream Land GB",
				  "Unova Pokemon League", "Prism Tower", "Mute City SNES",
				  "Magicant", "Arena Ferox", "Reset Bomb Forest",
				  "Tortimer Island", "Balloon Fight", "Living Room",
				  "Find Mii", "Tomodachi Life", "PictoChat 2",
				  "Mushroom Kingdom U", "Mario Galaxy", "Mario Circuit",
				  "Skyloft", "The Great Cave Offensive",
				  "Kalos Pokemon League", "Coliseum", "Flat Zone X",
				  "Palutena's Temple", "Gamer", "Garden of Hope",
				  "Town and City", "Wii Fit Studio", "Boxing Ring",
				  "Gaur Plain", "Duck Hunt", "Wrecking Crew",
				  "Pilotwings", "Wuhu Island", "Windy Hill Zone",
				  "Wily Castle", "PAC-LAND", "Super Mario Maker",
				  "Suzaku Castle", "Midgar", "Umbra Clock Tower",
				  "New Donk City Hall", "Great Plateau Tower",
				  "Moray Towers", "Dracula's Castle"]

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
	let emptyMessage = $('#emptyText')
	let btRandomize = $('#btRandomize')
	if (userSets.length == 0) {
		emptyMessage.removeClass('unloaded')
		$(btRandomize).attr('disabled', true)
		return
	} else {
		emptyMessage.addClass('unloaded')
		$(btRandomize).attr('disabled', false)
	}
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
	randomize()
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
	if (skinsOn && characterIndex != 53 && characterIndex != 54 && characterIndex != 55) {
		for (let i = 0; i < skins.length; i++) {
			if (skins[i].character == characterIndex) {
				selectedSkin = skins[i].enabled[randomIntFromInterval(0, skins[i].enabled.length-1)]
			}
		}
	}

	let varText = 'Normal'
	let enabledStages = []
	for (let i = 0; i < stages.length; i++) {
		if (stages[i]) {
			enabledStages.push(i)
		}
	}
	let selectedStage = enabledStages[randomIntFromInterval(0, enabledStages.length-1)]+1
	if (selectedStage-1 == 0 && battlefieldsOn) {
		varText = 'Battlefield'
		let enabledBattlefields = []
		for (let i = 0; i < battlefields.length; i++) {
			if (battlefields[i]) {
				enabledBattlefields.push(i)
			}
		}
		selectedStage = enabledBattlefields[randomIntFromInterval(0, enabledBattlefields.length-1)]+1
	} else if (selectedStage-1 == 2 && omegasOn){
		varText = 'Omega'
		let enabledOmegas = []
		for (let i = 0; i < omegas.length; i++) {
			if (omegas[i]) {
				enabledOmegas.push(i)
			}
		}
		selectedStage = enabledOmegas[randomIntFromInterval(0, enabledOmegas.length-1)]+1
	}


	// Display results
	let characterImg = $('#characterImg')
	$(characterImg).attr('src', `https://s3.amazonaws.com/smashassets/_smallassets/_renders/${selectedCharacter}/0${selectedSkin}.png`)
	$(characterImg).attr('alt', `${characterNames[characterIndex]} skin ${selectedSkin}`)
	let stageImg = $('#stageImg')
	$(stageImg).attr('src', `https://s3.amazonaws.com/smashassets/_smallassets/_stages/stage_img${selectedStage}.jpg`)
	$(stageImg).attr('alt', `${stageNames[selectedStage-1]}`)
	let variationText = $('#variationText')
	variationText.html(varText)
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log('Main page startup')
startUp()
console.log('Main page loaded')