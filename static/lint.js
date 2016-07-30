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
	syntaxCheck();
}
// check for syntax problems like invalid values, formatting etc
function syntaxCheck() {
	for (m = presetPrototypeLength; m < prototypes.length;m++) {
		// Check if the technical name of prototype contains spaces
		if(prototypes[m].name.contains(' ')){
			console.log('ERROR: INVALID PROTOTYPE NAME: ' + prototypes[m].name);
		}
		if(prototypes[m].type == 'technology'){
			if(!prototypes[m].unit.contains('}')){
				console.log('ERROR: TECHNOLOGY.UNIT EXPECTS OBJECT');
			}
			if(!prototypes[m].effects.contains(']')){
				console.log('ERROR: TECHNOLOGY.EFFECT EXPECTS ARRAY');
			} else if (!prototypes[m].effects.contains('}')){
				console.log('ERROR: TECHNOLOGY.EFFECT.array EXPECTS OBJECT');
			}
		}
	}
}
