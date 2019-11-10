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
}

function loadCharacters () {
	let characterSelect = $('#characterSelect')
	let perRow = 0
	let newRow = $(`<div class="row"></div>`)
	for (let i = 0; i < characterFolders.length; i++) {
		let currentColumn = $(`<div class="col img-thumbnail"></div>`)
		let currentImage = $(`<img class="img-fluid" src="./_assets/_renders/${characterFolders[i]}/01.png">`)
		$(currentColumn).data('characterNumber', i)
		$(currentImage).data('characterNumber', i)
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

function handleCharacters () {
	// Entire roster toggle
	let toggleCharactersBtn = $('#toggleCharacters')
	let characters = $('#characterSelect .img-fluid')
	$(toggleCharactersBtn).on('click', (e) => {
		e.preventDefault();
		for (let i = 0; i < characters.length; i++) {
			if (toggleCharacters) {
				$(characters[i]).addClass('toggled-off')
			} else {
				$(characters[i]).removeClass('toggled-off')
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

console.log("Settings page startup")
startUp()
console.log("Settings page loaded")