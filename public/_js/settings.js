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

function startUp () {
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
	handleTags()
	handleSave()
}


// Image Loaders
function loadCharacters () {
	let characterSelect = $('#characterSelect')
	let perRow = 0
	let newRow = $(`<div class="row"></div>`)
	for (let i = 0; i < characterFolders.length; i++) {
		let currentColumn = $(`<div class="col img-thumbnail"></div>`)
		let currentImage = $(`<img class="img-fluid" src="./_assets/_renders/${characterFolders[i]}/01.png">`)
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
		let currentImage = $(`<img class="img-fluid" src="./_assets/_stages/stage_img${i}.jpg">`)
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
				let currentImage = $(`<img class="img-fluid" src="./_assets/_renders/${characterFolders[i]}/0${j}.png">`)
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
		let currentImage = $(`<img class="img-fluid" src="./_assets/_stages/stage_img${i}.jpg">`)
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
		let currentImage = $(`<img class="img-fluid" src="./_assets/_stages/stage_img${i}.jpg">`)
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
					if (enabledSkins.length < 1) {
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
	})
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