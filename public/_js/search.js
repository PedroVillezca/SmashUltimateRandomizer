function startUp () {
	handleTags()
}

function handleTags () {
	let tags = $('.tag-container .badge-primary')
	for (let i = 0; i < tags.length; i++) {
		$(tags[i]).on('click', () => {
			$(tags[i]).toggleClass('toggled-off')
		})
	}
}



console.log("Search page startup")
startUp()
console.log("Search page loaded")