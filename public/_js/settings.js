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

function startUp () {
	loadCharacters()
	handleCharacters()
	loadStages()
	handleStages()
	loadSkins()
	handleSkins()
}

function loadCharacters () {
	let characterSelect = $('#characterSelect')
	let perRow = 0
	let newRow = $(`<div class="row"></div>`)
	for (let i = 0; i < characterFolders.length; i++) {
		let currentColumn = $(`<div class="col img-thumbnail"></div>`)
		let currentImage = $(`<img class="img-fluid" src="./_assets/_renders/${characterFolders[i]}/01.png">`)
		$(currentColumn).data('characterNumber', i+1)
		$(currentImage).data('characterNumber', i+1)
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

function loadSkins() {
	let skinSelect = $('#skinSelect')
	for (let i = 0; i < characterFolders.length; i++) {
		let newRow = $(`<div class="row" id="skins${i+1}""></div>`)
		if (characterFolders[i] != '51' && characterFolders[i] != '52' && characterFolders[i] != '53') {
			for (let j = 1; j <= 8; j++) {
				let currentColumn = $(`<div class="col img-thumbnail"></div>`)
				let currentImage = $(`<img class="img-fluid" src="./_assets/_renders/${characterFolders[i]}/0${j}.png">`)
				$(currentColumn).data('characterNumber', i+1)
				$(currentColumn).data('skinNumber', j)
				$(currentImage).data('characterNumber', i+1)
				$(currentImage).data('skinNumber', i)
				$(currentColumn).append(currentImage)
				$(newRow).append(currentColumn)
			}
		}
		$(skinSelect).append(newRow)
	}
}

function handleCharacters () {
	// Entire roster toggle
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

	// Individual character toggle
	for (let i = 0; i < characters.length; i++){
		$(characters[i]).on('click', (e) => {
			e.preventDefault()
			toggleSkin(i+1, $(characters[i]).hasClass('toggled-off'))
			$(characters[i]).toggleClass('toggled-off')
		})
	}
}

function handleStages () {
	// All stages toggle
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

	// Individual character toggle
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