let userSets

function startUp () {
	if (!localStorage['currentUser']) {
		window.location.href = './index.html'
	}
	changeTitle()
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
			handleEdit()
			handleRemove()
		})
}

function loadSets (userSets) {
	let setContainer = $('#profile #setContainer')
	let emptyProfile = $('#profile #emptyProfile')
	if (userSets.length == 0) {
		emptyProfile.removeClass('unloaded')
	} else {
		emptyProfile.addClass('unloaded')
	}
	for (let i = 0; i < userSets.length; i++) {
		let currentCard = $(`<div class="card" id="setCard${i}"></div>`)
		let currentCardBody = $(`<div class="card-body text-left">
									 <h6 class="card-title">${userSets[i].description}</h6>
									 <p class="card-text">by ${userSets[i].ownedBy}</p>
								 </div>`)
		let currentTags = $(`<div class="set-tags">
								<span class="card-text">Tags:</span>
							 </div>`)
		for (let j = 0; j < userSets[i].tags.length; j++) {
			$(currentTags).append(`<span class="badge badge-primary">${userSets[i].tags[j]}</span>`)
		}
		$(currentCardBody).append(currentTags)
		let privacy
		if (userSets[i].isPublic) {
			privacy = "Public"
		} else {
			privacy = "Private"
		}
		$(currentCardBody).append(`<p class="card-text privacy-text">${privacy}</p>`)
		if (userSets[i].privateLocked) {
			$(currentCardBody).append(`<p class="card-text privacy-text">This set was copied from someone else, so it can't be made public</p>`)
		}
		$(currentCard).append(currentCardBody)
		let currentCardFooter = $(`<div class="card-footer">
									<span class="download-info">
										<img class="img" src="./_assets/_icons/download.png">
                  						<span class="download-number">${userSets[i].downloads}</span>
									</span>
								   </div>`)
		let currentCardSpan = $(`<span class="set-buttons"></span`)
		let currentCardRemove = $(`<button class="btn btn-primary remove-button">Remove</button>`)
		let currentCardButton = $(`<button class="btn btn-primary edit-button">Edit</button>`)
		$(currentCardButton).data('rset', userSets[i])
		$(currentCardRemove).data('rset', userSets[i])
		$(currentCardRemove).data('parentId', `setCard${i}`)
		$(currentCardSpan).append(currentCardRemove)
		$(currentCardSpan).append(currentCardButton)
		$(currentCardFooter).append(currentCardSpan)
		$(currentCard).append(currentCardFooter)
		$(setContainer).append(currentCard)
	}

}

function handleRemove () {
	let removeButtons = $('#profile .remove-button')
	for (let i = 0; i < removeButtons.length; i++) {
		$(removeButtons[i]).on('click', (e) => {
			let info = {
				ownedBy: $(removeButtons[i]).data('rset').ownedBy,
				description: $(removeButtons[i]).data('rset').description
			}
			$.ajax({
				url: '/deleteSet',
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(info),
				method: "DELETE",
				success: () => {
					let parentCard = $(`#${$(removeButtons[i]).data('parentId')}`)
					$(parentCard).remove()
				},
				error: (err) => {
					console.log(err.statusMessage)
				}
			})
		})
	}
}

function handleEdit () {
	let editButtons = $('#profile .edit-button')
	for (let i = 0; i < editButtons.length; i++) {
		$(editButtons[i]).on('click', (e) => {
			localStorage.setItem('editMode', true)
			let currentRset = $(editButtons[i]).data('rset')
			localStorage.setItem('currentRset', JSON.stringify(currentRset))
			window.location.href = './settings.html'
		})
	}
}

function changeTitle () {
	let profileTitle = $('.profile-title')
	$(profileTitle).html(`${localStorage['currentUser']}'s Sets`)
}

console.log('Profile page startup')
startUp()
console.log('Profile page loaded')