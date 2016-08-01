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
		// Using a setTimeout to prevent linting from blocking the main thread
		setTimeout(syntaxCheck(m), 1000);
	}
}
// check for syntax problems like invalid values, formatting etc
function syntaxCheck(m) {
	// m is ID of ptototype to check
	// Check if the technical name of prototype contains spaces
	if(prototypes[m].name.contains(' ')){
		console.log('ERROR: INVALID PROTOTYPE NAME: ' + prototypes[m].name);
		$.Notify({
			caption: 'ERROR',
			content: 'INVALID PROTOTYPE NAME: ' + prototypes[m].name,
			type: 'alert',
			timeout: 10000
		});
	}
	// Check if tech prototypes include what they should
	if(prototypes[m].type == 'technology'){
		if(!prototypes[m].unit.contains('}')){
			console.log('ERROR: TECHNOLOGY.UNIT EXPECTS OBJECT');
			$.Notify({
				caption: 'ERROR',
				content: 'TECHNOLOGY.UNIT EXPECTS object',
				type: 'alert',
				timeout: 10000
			});
		}
		if(!prototypes[m].effects.contains(']')){
			console.log('ERROR: TECHNOLOGY.EFFECT EXPECTS ARRAY');
			$.Notify({
				caption: 'ERROR',
				content: 'TECHNOLOGY.EFFECT EXPECTS array',
				type: 'alert',
				timeout: 10000
			});
		} else if (!prototypes[m].effects.contains('}')){
			console.log('ERROR: TECHNOLOGY.EFFECT.array EXPECTS OBJECT');
			$.Notify({
				caption: 'ERROR',
				content: 'TECHNOLOGY.EFFECT.array EXPECTS object',
				type: 'alert',
				timeout: 10000
			});
		}
	}
	if(!checktype(prototypes[m].type)) {
		console.log('ERROR: INVALID PROTOTYPE (' + prototypes[m].name + ') TYPE: ' + prototypes[m].type)
		$.Notify({
			caption: 'ERROR',
			content: 'INVALID PROTOTYPE (' + prototypes[m].name + ') TYPE: ' + prototypes[m].type,
			type: 'alert',
			timeout: 10000
		});
	}
}
function checktype(type) {
	// Using longer addition instead of ++ because its faster
	for(n = 0; n < validTypes.length;n = n + 1) {
		if(validTypes[n] == type) {
			return true;
		}
	}
}
var validTypes = [
'accumulator',
'achievement',
'achievement',
'active-defense-equipment',
'ambient-sound',
'ammo',
'ammo-category',
'ammo-turret',
'arithmetic-combinator',
'armor',
'arrow',
'assembling-machine',
'autoplace-control',
'battery-equipment',
'beacon',
'beam',
'blueprint-book',
'boiler',
'build-entity-achievement',
'capsule',
'car',
'cargo-wagon',
'combat-robot',
'constant-combinator',
'construct-with-robots-achievement',
'construction-robot',
'container',
'corpse',
'curved-rail',
'custom-input',
'damage-type',
'decider-combinator',
'deconstruct-with-robots-achievement',
'deconstructible-tile-proxy',
'deconstruction-item',
'decorative',
'deliver-by-robots-achievement',
'dont-build-entity-achievement',
'dont-craft-manually-achievement',
'dont-use-entity-in-energy-production-achievement',
'electric-pole',
'electric-turret',
'energy-shield-equipment',
'entity',
'entity-ghost',
'equipment',
'explosion',
'finish-the-game-achievement',
'fish',
'flame-thrower-explosion',
'fluid',
'flying-text',
'font',
'furnace',
'gate',
'generator',
'generator-equipment',
'group-attack-achievement',
'gui-style',
'gun',
'inserter',
'item',
'item-entity',
'item-group',
'item-request-proxy',
'item-subgroup',
'item-with-inventory',
'item-with-label',
'kill-achievement',
'lab',
'lamp',
'land-mine',
'leaf-particle',
'locomotive',
'logistic-container',
'logistic-robot',
'market',
'mining-drill',
'mining-tool',
'module',
'module-category',
'movement-bonus-equipment',
'night-vision-equipment',
'noise-layer',
'offshore-pump',
'particle',
'particle-source',
'pipe',
'pipe-to-ground',
'player',
'player-damaged-achievement',
'player-port',
'power-switch',
'produce-achievement',
'produce-per-hour-achievement',
'projectile',
'pump',
'radar',
'rail-category',
'rail-category',
'rail-chain-signal',
'rail-planner',
'rail-remnants',
'rail-signal',
'recipe',
'recipe-category',
'repair-tool',
'research-achievement',
'resource',
'resource-category',
'roboport',
'roboport-equipment',
'rocket-defense',
'rocket-silo',
'rocket-silo-rocket',
'rocket-silo-rocket-shadow',
'selection-tool',
'simple-entity',
'smoke',
'smoke-with-trigger',
'solar-panel',
'solar-panel-equipment',
'splitter',
'sticker',
'storage-tank',
'straight-rail',
'technology',
'tile',
'tile-ghost',
'tool',
'train-path-achievement',
'train-stop',
'transport-belt',
'tree',
'turret',
'underground-belt',
'unit',
'unit-spawner',
'utility-sprites',
'virtual-signal',
'wall',
]
