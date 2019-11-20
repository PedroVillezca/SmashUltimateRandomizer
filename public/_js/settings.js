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
let toggleCharacters = true
let toggleStages = true
let toggleOmegas = true
let toggleBattlefields = true
let mode

function startUp () {
	if (!localStorage['currentUser']) {
		window.location.href = './index.html'
	}
	if (localStorage['editMode']) {
		mode = 'edit'
		localStorage.removeItem('editMode')
	} else if (localStorage['downloadMode']) {
		mode = 'download'
		localStorage.removeItem('downloadMode')
	} else {
		mode = 'save'
	}
	loadCharacters()
	handleCharacters()
	loadStages()
	handleStages()
	loadSkins()
	handleSkins()
	loadOmegas()
	handleOmegas()
	loadBattlefields()
	handleBattlefields()
	loadTags()
	handleTags()
	if (mode != 'save') {
		setOptions()
	}
	handleSave()
}


// Image Loaders
function loadCharacters () {
	let characterSelect = $('#characterSelect')
	let perRow = 0
	let newRow = $(`<div class="row"></div>`)
	for (let i = 0; i < characterFolders.length; i++) {
		let currentColumn = $(`<div class="col img-thumbnail"></div>`)
		let currentImage = $(`<img class="img-fluid" alt="${characterNames[i]}" src="https://s3.amazonaws.com/smashassets/_smallassets/_renders/${characterFolders[i]}/01.png">`)
		$(currentColumn).data('characterIndex', i)
		$(currentImage).data('characterIndex', i)
		$(currentColumn).append(currentImage)
		if (perRow >= 8) {
			$(characterSelect).append(newRow)
			newRow = $(`<div class="row"></div>`)
			perRow = 0
		}
		$(newRow).append(currentColumn)
		perRow += 1
	}
	while (perRow < 7) {
		$(newRow).append(`<div class="col"></div>`)
		perRow += 1
	}
	$(characterSelect).append(newRow)
}

function loadStages () {
	let stageSelect = $('#stageSelect')
	let perRow = 0
	let newRow = $(`<div class="row"></div>`)
	for (let i = 1; i < 104; i++) {
		let currentColumn = $(`<div class="col img-thumbnail"></div>`)
		let currentImage = $(`<img class="img-fluid" alt="${stageNames[i-1]}" src="https://s3.amazonaws.com/smashassets/_smallassets/_stages/stage_img${i}.jpg">`)
		$(currentColumn).data('stageNumber', i)
		$(currentImage).data('stageNumber', i)
		$(currentColumn).append(currentImage)
		if (perRow >= 8) {
			$(stageSelect).append(newRow)
			newRow = $(`<div class="row"></div>`)
			perRow = 0
		}
		$(newRow).append(currentColumn)
		perRow += 1
	}
	while (perRow < 7) {
		$(newRow).append(`<div class="col"></div>`)
		perRow += 1
	}
	$(stageSelect).append(newRow)
}

function loadSkins () {
	let skinSelect = $('#skinSelect')
	for (let i = 0; i < characterFolders.length; i++) {
		let newRow = $(`<div class="row" id="skins${i+1}""></div>`)
		if (characterFolders[i] != '51' && characterFolders[i] != '52' && characterFolders[i] != '53') {
			for (let j = 1; j <= 8; j++) {
				let currentColumn = $(`<div class="col img-thumbnail"></div>`)
				let currentImage = $(`<img class="img-fluid" alt="${characterNames[i]} skin number ${j}" src="https://s3.amazonaws.com/smashassets/_smallassets/_renders/${characterFolders[i]}/0${j}.png">`)
				$(currentColumn).data('characterIndex', i)
				$(currentColumn).data('skinNumber', j)
				$(currentImage).data('characterIndex', i)
				$(currentImage).data('skinNumber', j)
				$(currentColumn).append(currentImage)
				$(newRow).append(currentColumn)
			}
		}
		$(skinSelect).append(newRow)
	}
}

function loadOmegas () {
	let omegaSelect = $('#omegaSelect')
	let perRow = 0
	let newRow = $(`<div class="row"></div>`)
	for (let i = 1; i < 104; i++) {
		let currentColumn = $(`<div class="col img-thumbnail"></div>`)
		let currentImage = $(`<img class="img-fluid" alt="${stageNames[i-1]} Omega form" src="https://s3.amazonaws.com/smashassets/_smallassets/_stages/stage_img${i}.jpg">`)
		$(currentColumn).data('omegaNumber', i)
		$(currentImage).data('omegaNumber', i)
		$(currentColumn).append(currentImage)
		if (perRow >= 8) {
			$(omegaSelect).append(newRow)
			newRow = $(`<div class="row"></div>`)
			perRow = 0
		}
		$(newRow).append(currentColumn)
		perRow += 1
	}
	while (perRow < 7) {
		$(newRow).append(`<div class="col"></div>`)
		perRow += 1
	}
	$(omegaSelect).append(newRow)
}

function loadBattlefields () {
	let battlefieldSelect = $('#battlefieldSelect')
	let perRow = 0
	let newRow = $(`<div class="row"></div>`)
	for (let i = 1; i < 104; i++) {
		let currentColumn = $(`<div class="col img-thumbnail"></div>`)
		let currentImage = $(`<img class="img-fluid" alt="${stageNames[i-1]} Battlefield form" src="https://s3.amazonaws.com/smashassets/_smallassets/_stages/stage_img${i}.jpg">`)
		$(currentColumn).data('battlefieldNumber', i)
		$(currentImage).data('battlefieldNumber', i)
		$(currentColumn).append(currentImage)
		if (perRow >= 8) {
			$(battlefieldSelect).append(newRow)
			newRow = $(`<div class="row"></div>`)
			perRow = 0
		}
		$(newRow).append(currentColumn)
		perRow += 1
	}
	while (perRow < 7) {
		$(newRow).append(`<div class="col"></div>`)
		perRow += 1
	}
	$(battlefieldSelect).append(newRow)
}

// Selection handlers
function handleCharacters () {
	// Entire roster toggling
	let toggleCharactersBtn = $('#toggleCharacters')
	let characters = $('#characterSelect .img-fluid')
	$(toggleCharactersBtn).on('click', (e) => {
		e.preventDefault();
		for (let i = 0; i < characters.length; i++) {
			if (toggleCharacters) {
				$(characters[i]).addClass('toggled-off')
				toggleSkin(i+1, false)
			} else {
				$(characters[i]).removeClass('toggled-off')
				toggleSkin(i+1, true)
			}
		}

		toggleCharacters = !toggleCharacters
		if (toggleCharacters) {
			$(toggleCharactersBtn).html('All Off')
		} else {
			$(toggleCharactersBtn).html('All On')
		}
	})

	// Individual character toggling
	for (let i = 0; i < characters.length; i++){
		$(characters[i]).on('click', (e) => {
			e.preventDefault()
			toggleSkin(i+1, $(characters[i]).hasClass('toggled-off'))
			$(characters[i]).toggleClass('toggled-off')
		})
	}
}

function handleStages () {
	// All stages toggling
	let toggleStagesBtn = $('#toggleStages')
	let stages = $('#stageSelect .img-fluid')
	$(toggleStagesBtn).on('click', (e) => {
		e.preventDefault();
		for (let i = 0; i < stages.length; i++) {
			if (toggleStages) {
				$(stages[i]).addClass('toggled-off')
			} else {
				$(stages[i]).removeClass('toggled-off')
			}
		}

		toggleStages = !toggleStages
		if (toggleStages) {
			$(toggleStagesBtn).html('All Off')
		} else {
			$(toggleStagesBtn).html('All On')
		}
	})

	// Individual stage toggling
	for (let i = 0; i < stages.length; i++) {
		$(stages[i]).on('click', (e) => {
			e.preventDefault()
			$(stages[i]).toggleClass('toggled-off')
		})
	}
}

function handleSkins () {
	// Individual character toggling
	let skins = $('#skinSelect .img-fluid')
	for (let i = 0; i < skins.length; i++) {
		$(skins[i]).on('click', (e) => {
			e.preventDefault()
			$(skins[i]).toggleClass('toggled-off')
		})
	}

	// Entire div toggling
	let skinsCheck = $('#skinsCheck')
	let skinSelect = $('#skinSelect')
	$(skinsCheck).change( () => {
		if ($(skinsCheck).is(':checked')) {
			skinSelect.removeClass('unloaded')
		} else {
			skinSelect.addClass('unloaded')
		}
	})
}

function handleOmegas () {
	// All omegas toggling
	let toggleOmegasBtn = $('#toggleOmegas')
	let omegas = $('#omegaSelect .img-fluid')
	$(toggleOmegasBtn).on('click', (e) => {
		e.preventDefault();
		for (let i = 0; i < omegas.length; i++) {
			if (toggleOmegas) {
				$(omegas[i]).addClass('toggled-off')
			} else {
				$(omegas[i]).removeClass('toggled-off')
			}
		}

		toggleOmegas = !toggleOmegas
		if (toggleOmegas) {
			$(toggleOmegasBtn).html('All Off')
		} else {
			$(toggleOmegasBtn).html('All On')
		}
	})

	// Individual omega toggling
	for (let i = 0; i < omegas.length; i++) {
		$(omegas[i]).on('click', (e) => {
			e.preventDefault()
			$(omegas[i]).toggleClass('toggled-off')
		})
	}

	// Entire div toggling
	let omegasCheck = $('#omegasCheck')
	let omegaSelect = $('#omegaSelect')
	$(omegasCheck).change( () => {
		if ($(omegasCheck).is(':checked')) {
			omegaSelect.removeClass('unloaded')
		} else {
			omegaSelect.addClass('unloaded')
		}
	})
}

function handleBattlefields () {
	// All battlefields toggling
	let toggleBattlefieldsBtn = $('#toggleBattlefields')
	let battlefields = $('#battlefieldSelect .img-fluid')
	$(toggleBattlefieldsBtn).on('click', (e) => {
		e.preventDefault();
		for (let i = 0; i < battlefields.length; i++) {
			if (toggleBattlefields) {
				$(battlefields[i]).addClass('toggled-off')
			} else {
				$(battlefields[i]).removeClass('toggled-off')
			}
		}

		toggleBattlefields = !toggleBattlefields
		if (toggleBattlefields) {
			$(toggleBattlefieldsBtn).html('All Off')
		} else {
			$(toggleBattlefieldsBtn).html('All On')
		}
	})

	// Individual battlefield toggling
	for (let i = 0; i < battlefields.length; i++) {
		$(battlefields[i]).on('click', (e) => {
			e.preventDefault()
			$(battlefields[i]).toggleClass('toggled-off')
		})
	}

	// Entire div toggling
	let battlefieldsCheck = $('#battlefieldsCheck')
	let battlefieldSelect = $('#battlefieldSelect')
	$(battlefieldsCheck).change( () => {
		if ($(battlefieldsCheck).is(':checked')) {
			battlefieldSelect.removeClass('unloaded')
		} else {
			battlefieldSelect.addClass('unloaded')
		}
	})
}

function loadTags () {
	let tags = $('.tag-container .badge-primary')
	for (let i = 0; i < tags.length; i++) {
		$(tags[i]).addClass('toggled-off')
	}
}

function handleTags () {
	let tags = $('.tag-container .badge-primary')
	for (let i = 0; i < tags.length; i++) {
		$(tags[i]).on('click', () => {
			$(tags[i]).toggleClass('toggled-off')
		})
	}
}

function handleSave () {
	let saveSet = $('#saveSet')
	let setTitle = $('#setTitle')
	let setTags = $('.tag-container .badge-primary')
	let optionPrivate = $('#radioPrivate')
	let optionPublic = $('#radioPublic')
	let errorText = $('#settings .error-text')
	$(saveSet).on('click', (e) => {
		e.preventDefault()

		// Check for missing fields
		if (!$(setTitle).val()) {
			$(setTitle).addClass('is-invalid')
			return
		} else {
			$(setTitle).removeClass('is-invalid')
		}
		let enabledCharacters = $('#characterSelect .img-fluid').not('.toggled-off')
		if (enabledCharacters.length < 1) {
			errorText.html('Please select at least one character')
			errorText.removeClass('unloaded')
			return
		}
		let enabledStages = $('#stageSelect .img-fluid').not('.toggled-off')
		if (enabledStages.length < 1) {
			errorText.html('Please select at least one stage')
			errorText.removeClass('unloaded')
			return
		}

		// Get set options
		let description = $(setTitle).val()
		let isPublic
		if ($(optionPrivate).is(':checked')) {
			isPublic = false;
		} else {
			isPublic = true;
		}
		let tags = []
		for (let i = 0; i < setTags.length; i++) {
			if(!$(setTags[i]).hasClass('toggled-off')) {
				tags.push($(setTags[i]).html())
			}
		}

		// Get enabled characters
		let characters = []
		let enabledIndex = 0
		let charIndex = 0
		while (charIndex < 76) {
			if ($(enabledCharacters[enabledIndex]).data('characterIndex') == charIndex) {
				characters.push(true)
				enabledIndex += 1
			} else {
				characters.push(false)
			}
			charIndex += 1
		}

		// Get enabled skins
		let skinsCheck = $('#skinsCheck')
		let skinsOn
		let skins = []
		if (!$(skinsCheck).is(':checked')) {
			skinsOn = false
		} else {
			skinsOn = true
			for (let i = 0; i < characters.length; i++) {
				if (characters[i]) {
					let enabledSkins = $(`#skins${i+1} .img-fluid`).not('.toggled-off')
					if (enabledSkins.length < 1 && i != 53 && i != 54 && i != 55) {
						errorText.html('Please make sure all of your characters have at least one skin enabled')
						errorText.removeClass('unloaded')
						return
					}
					let currentSkins = {
						character: i,
						enabled: []
					}
					for (let j = 0; j < enabledSkins.length; j++) {
						currentSkins.enabled.push($(enabledSkins[j]).data('skinNumber'))
					}
					skins.push(currentSkins)
				}
			}
		}

		// Get enabled stages
		let stages = []
		enabledIndex = 0
		let stageIndex = 0
		while (stageIndex < 103) {
			if ($(enabledStages[enabledIndex]).data('stageNumber') == stageIndex+1) {
				stages.push(true)
				enabledIndex += 1
			} else {
				stages.push(false)
			}
			stageIndex += 1
		}

		// Get enabled omegas
		let omegasCheck = $('#omegasCheck')
		let omegasOn
		let omegas = []
		if (!$(omegasCheck).is(':checked')) {
			omegasOn = false
		} else {
			if (!stages[2]) {
				errorText.html('To enable Omegas, you must include the Final Destination stage')
				errorText.removeClass('unloaded')
				return
			}
			omegasOn = true
			let enabledOmegas = $('#omegaSelect .img-fluid').not('.toggled-off')
			if (enabledOmegas.length < 1) {
				errorText.html('Please select at least one Omega')
				errorText.removeClass('unloaded')
				return
			}
			enabledIndex = 0
			let omegaIndex = 0
			while (omegaIndex < 103) {
				if ($(enabledOmegas[enabledIndex]).data('omegaNumber') == omegaIndex+1) {
					omegas.push(true)
					enabledIndex += 1
				} else {
					omegas.push(false)
				}
				omegaIndex += 1
			}
		}

		// Get enabled battlefields
		let battlefieldsCheck = $('#battlefieldsCheck')
		let battlefieldsOn
		let battlefields = []
		if (!$(battlefieldsCheck).is(':checked')) {
			battlefieldsOn = false
		} else {
			if (!stages[0]) {
				errorText.html('To enable Battlefields, you must include the Battlefield stage')
				errorText.removeClass('unloaded')
				return
			}
			battlefieldsOn = true
			let enabledBattlefields = $('#battlefieldSelect .img-fluid').not('.toggled-off')
			if (enabledBattlefields.length < 1) {
				errorText.html('Please select at least one Battlefield')
				errorText.removeClass('unloaded')
				return
			}
			enabledIndex = 0
			let battlefieldIndex = 0
			while (battlefieldIndex < 103) {
				if ($(enabledBattlefields[enabledIndex]).data('battlefieldNumber') == battlefieldIndex+1) {
					battlefields.push(true)
					enabledIndex += 1
				} else {
					battlefields.push(false)
				}
				battlefieldIndex += 1
			}
		}
		let rset = {
			description: description,
			characters: characters,
			skinsOn: skinsOn,
			skins: skins,
			stages: stages,
			omegasOn: omegasOn,
			omegas: omegas,
			battlefieldsOn: battlefieldsOn,
			battlefields: battlefields,
			tags: tags,
			isPublic: isPublic,
			ownedBy: localStorage['currentUser'],
			downloads: 0,
			privateLocked: false
		}
		if (mode == 'save') {
			$.ajax({
				url: '/createSet',
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(rset),
				method: "POST",
				success: () => {
					window.location.href = './main.html'
				},
				error: (err) => {
					if (err.status == 409) {
						errorText.html('You already have a set with the same description')
					} else {
						errorText.html('Something went wrong with the server.')
					}
					errorText.removeClass('unloaded')
				}
			})
		} else if (mode == 'edit') {
			rset._id = JSON.parse(localStorage['currentRset'])._id
			rset.downloads = JSON.parse(localStorage['currentRset']).downloads
			rset.privateLocked = JSON.parse(localStorage['currentRset']).privateLocked
			$.ajax({
				url: '/editSet',
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(rset),
				method: "PUT",
				success: () => {
					localStorage.removeItem('currentRset')
					window.location.href = './profile.html'
				},
				error: (err) => {
					errorText.html('Something went wrong with the server.')
					errorText.removeClass('unloaded')
				}
			})
		} else {
			rset.privateLocked = true
			$.ajax({
				url: '/createSet',
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(rset),
				method: "POST",
				success: () => {},
				error: (err) => {
					if (err.status == 409) {
						errorText.html('You already have a set with the same description')
					} else {
						errorText.html('Something went wrong with the server.')
					}
					errorText.removeClass('unloaded')
				}
			}).done(updateOriginal)
		}
	})
}

function updateOriginal () {
	let existingRset = JSON.parse(localStorage['currentRset'])
	existingRset.downloads = existingRset.downloads + 1
	console.log(existingRset)
	$.ajax({
		url: '/editSet',
		dataType: "json",
		contentType: "application/json",
		data: JSON.stringify(existingRset),
		method: "PUT",
		success: () => {
			localStorage.removeItem('currentRset')
			window.location.href = './profile.html'
		},
		error: (err) => {
			console.log(err.statusMessage)
		}
	})
}
// Premade rset functions
function setOptions () {
	let rset = JSON.parse(localStorage['currentRset'])
	setCharacters(rset.characters)
	if (rset.skinsOn) {
		setSkins(rset.skins)
	}
	setStages(rset.stages)
	if (rset.omegasOn) {
		setOmegas(rset.omegas)
	}
	if (rset.battlefieldsOn) {
		setBattlefields(rset.battlefields)
	}
	setTags(rset.tags)
	setRestrictions(rset)
}

function setCharacters (characters) {
	let characterImages = $('#characterSelect .img-fluid')
	for (let i = 0; i < characterImages.length; i++) {
		if (!characters[i]) {
			$(characterImages[i]).addClass('toggled-off')
			toggleSkin(i+1, false)
		}
	}
}

function setSkins (skins) {
	for (let i = 0; i < skins.length; i++) {
		let enabledIndex = 0
		let skinImages = $(`#skins${skins[i].character+1} .img-fluid`)
		for (let j = 0; j < skinImages.length; j++) {
			if (enabledIndex < skins[i].enabled.length) {
				if (skins[i].enabled[enabledIndex] == j+1) {
					enabledIndex += 1
				} else {
					$(skinImages[j]).addClass('toggled-off')
				}
			} else {
				$(skinImages[j]).addClass('toggled-off')
			}
		}
	}
}

function setStages (stages) {
	let stageImages = $('#stageSelect .img-fluid')
	for (let i = 0; i < stageImages.length; i++) {
		if (!stages[i]) {
			$(stageImages[i]).addClass('toggled-off')
		}
	}
}

function setOmegas (omegas) {
	let omegaImages = $('#omegaSelect .img-fluid')
	for (let i = 0; i < omegaImages.length; i++) {
		if (!omegas[i]) {
			$(omegaImages[i]).addClass('toggled-off')
		}
	}
}

function setBattlefields (battlefields) {
	let battlefieldImages = $('#battlefieldSelect .img-fluid')
	for (let i = 0; i < battlefieldImages.length; i++) {
		if (!battlefields[i]) {
			$(battlefieldImages[i]).addClass('toggled-off')
		}
	}
}

function setTags (tags) {
	let tagBadges = $('.tag-container .badge-primary')
	let tagIndex = 0
	for (let i = 0; i < tagBadges.length; i++) {
		if (tagIndex < tags.length) {
			if ($(tagBadges[i]).html() == tags[tagIndex]) {
				$(tagBadges[i]).removeClass('toggled-off')
				tagIndex += 1
			}
		}
	}
}

function setRestrictions (rset) {
	let setTitle = $('#setTitle')
	setTitle.val(rset.description)

	let optionPrivate = $('#radioPrivate')
	let optionPublic = $('#radioPublic')
	if (rset.isPublic) {
		$(optionPrivate).attr('checked', false)
		$(optionPublic).attr('checked', true)
	} else {
		$(optionPrivate).attr('checked', true)
		$(optionPublic).attr('checked', false)
	}

	if (rset.skinsOn) {
		let skinsCheck = $('#skinsCheck')
		let skinSelect = $('#skinSelect')
		$(skinsCheck).attr('checked', true)
		$(skinSelect).removeClass('unloaded')
	}
	if (rset.omegasOn) {
		let omegasCheck = $('#omegasCheck')
		let omegaSelect = $('#omegaSelect')
		$(omegasCheck).attr('checked', true)
		$(omegaSelect).removeClass('unloaded')
	}
	if (rset.battlefieldsOn) {
		let omegasCheck = $('#battlefieldsCheck')
		let omegaSelect = $('#battlefieldSelect')
		$(battlefieldsCheck).attr('checked', true)
		$(battlefieldSelect).removeClass('unloaded')
	}
	if (mode == 'download' || rset.privateLocked) {
		$(optionPrivate).attr('checked', true)
		$(optionPublic).attr('checked', false)
		$(optionPrivate).attr('disabled', true)
		$(optionPublic).attr('disabled', true)
	}
}

// Helper functions
function toggleSkin (number, state) {
	let skinRow = $(`#skins${number}`)
	if (state) {
		$(skinRow).removeClass('unloaded')
	} else {
		$(skinRow).addClass('unloaded')
	}
}

console.log("Settings page startup")
startUp()
console.log("Settings page loaded")