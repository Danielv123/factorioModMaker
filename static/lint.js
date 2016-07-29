// Function to color prototypes after their type property
function lint() {
	for (m = presetPrototypeLength; m < prototypes.length;m++) {
		if(prototypes[m].type == 'technology'){
			// [id=''] workaround required due to dumb me using numerical IDs
			document.querySelector('[id="' + m + '"] > .expander').style.backgroundColor = 'yellow';
		}
		if(prototypes[m].type == 'item'){
			document.querySelector('[id="' + m + '"] > .expander').style.backgroundColor = 'lightblue';
		}
		if(prototypes[m].type == 'recipe'){
			document.querySelector('[id="' + m + '"] > .expander').style.backgroundColor = 'red';
		}
		if(prototypes[m].type == 'entity'){
			document.querySelector('[id="' + m + '"] > .expander').style.backgroundColor = 'lightgreen';
		}
	}
}
