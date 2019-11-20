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

let characterMap = new Map()
let stageMap = new Map()

function startUp () {
	if (!localStorage['currentUser']) {
		window.location.href = './index.html'
	}
	makeCharacterMap()
	makeStageMap()
	handleTags()
	handleSearch()
}

function handleTags () {
	let tags = $('.tag-container .badge-primary')
	for (let i = 0; i < tags.length; i++) {
		$(tags[i]).on('click', () => {
			$(tags[i]).toggleClass('toggled-off')
		})
	}
}

function handleSearch () {
	let searchButton = $('#searchContainer .btn-dark')
	$(searchButton).on('click', (e) => {
		e.preventDefault()
		let enabledTags = $('.tag-container .badge-primary').not('.toggled-off')
		let tagsArray = []
		let tags = ""
		let useTags = false
		if (enabledTags.length > 0) {
			for (let i = 0; i < enabledTags.length; i++) {
				tagsArray.push($(enabledTags[i]).html())
			}
			tags = tagsArray.join()
			useTags = true
		}
		let searchResults
		$.ajax({
			url: `/searchSets?tags=${tags}&useTags=${useTags}`,
			dataType: "json",
			contentType: "application/json",
			method: "GET",
			success: (rsets) => {
				searchResults = rsets
			},
			error: (err) => {
				console.log(err.statusMessage)
			}
		})
			.then( () => {
				handleResults(searchResults)
				handleDownload()
			})
	})
}

function handleResults (searchResults) {
	let errorText = $('#search .error-text')
	let filteredResults = filterResults(searchResults)
	if (!filteredResults) {
		return
	}
	if (filteredResults.length == 0) {
		errorText.html(`Your search query yielded no results`)
		errorText.removeClass('unloaded')
		return
	}
	loadResults(filteredResults)
	errorText.addClass('unloaded')
}

function filterResults (searchResults) {
	let errorText = $('#search .error-text')
	let characterText = $('#searchContainer #characterText')
	let stageText = $('#searchContainer #stageText')
	let characters = $(characterText).val().split(', ')
	let stages = $(stageText).val().split(', ')
	let characterIndexes = []
	let stageIndexes = []
	for (let i = 0; i < characters.length; i++) {
		if (characterMap.has(characters[i].toLowerCase())) {
			characterIndexes.push(characterMap.get(characters[i].toLowerCase()))
		} else {
			if (characters[i] != '') {
				errorText.html(`${characters[i]} is not a character.`)
				errorText.removeClass('unloaded')
				return
			}
		}
	}
	for (let i = 0; i < stages.length; i++) {
		if (stageMap.has(stages[i].toLowerCase())) {
			stageIndexes.push(stageMap.get(stages[i].toLowerCase()))
		} else {
			if (stages[i] != '') {
				errorText.html(`${stages[i]} is not a stage.`)
				errorText.removeClass('unloaded')
				return
			}
		}
	}

	let filteredCharacters = []
	for (let i = 0; i < searchResults.length; i++) {
		let passes = true
		for (let j = 0; j < characterIndexes.length; j++) {
			if (!searchResults[i].characters[characterIndexes[j]]) {
				passes = false
			}
		}
		if (passes) {
			filteredCharacters.push(searchResults[i])
		}
	}
	let filteredResults = []
	for (let i = 0; i < filteredCharacters.length; i++) {
		let passes = true
		for (let j = 0; j < stageIndexes.length; j++) {
			if (!filteredCharacters[i].stages[stageIndexes[j]]) {
				passes = false
			}
		}
		if (passes) {
			filteredResults.push(filteredCharacters[i])
		}
	}
	return filteredResults
}

function loadResults (results) {
	let setContainer = $('#search #setContainer')
	$(setContainer).empty()
	for (let i = 0; i < results.length; i++) {
		let currentCard = $(`<div class="card" id="setCard${i}"></div>`)
		let currentCardBody = $(`<div class="card-body text-left">
									 <h6 class="card-title">${results[i].description}</h6>
									 <p class="card-text">by ${results[i].ownedBy}</p>
								 </div>`)
		let currentTags = $(`<div class="set-tags">
								<span class="card-text">Tags:</span>
							 </div>`)
		for (let j = 0; j < results[i].tags.length; j++) {
			$(currentTags).append(`<span class="badge badge-primary">${results[i].tags[j]}</span>`)
		}
		$(currentCardBody).append(currentTags)
		if (localStorage['currentUser'] == results[i].ownedBy) {
			$(currentCardBody).append(`<p class="card-text privacy-text">This set already belongs to you, so you can't save it.</p>`)
		}
		$(currentCard).append(currentCardBody)
		let currentCardFooter = $(`<div class="card-footer">
									<span class="download-info">
										<img class="img" src="./_assets/_icons/download.png">
                  						<span class="download-number">${results[i].downloads}</span>
									</span>
								   </div>`)
		let currentCardButton = $(`<button class="btn btn-primary save-button">Save</button>`)
		$(currentCardButton).data('rset', results[i])
		$(currentCardFooter).append(currentCardButton)
		$(currentCard).append(currentCardFooter)
		$(setContainer).append(currentCard)
	}
}

function handleDownload() {
	let saveButtons = $('#search .save-button')
	for (let i = 0; i < saveButtons.length; i++) {
		$(saveButtons[i]).on('click', (e) => {
			let currentRset = $(saveButtons[i]).data('rset')
			if (currentRset.ownedBy != localStorage['currentUser']) {
				localStorage.setItem('downloadMode', true)
				localStorage.setItem('currentRset', JSON.stringify(currentRset))
				window.open('./settings.html', '_blank')
			}
		})
	}
}

// Helper functions
function makeCharacterMap () {
	for (let i = 0; i < characterNames.length; i++) {
		characterMap.set(characterNames[i].toLowerCase(), i)
	}
}

function makeStageMap() {
	for (let i = 0; i < stageNames.length; i++) {
		stageMap.set(stageNames[i].toLowerCase(), i)
	}
}

console.log("Search page startup")
startUp()
console.log("Search page loaded")