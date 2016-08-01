// Register eventListeners
document.addEventListener("DOMContentLoaded", function(event) {
	//document.getElementById("modInfo").addEventListener("click", modInfo);
});
// Useful string tool
if (typeof String.prototype.contains === 'undefined') { String.prototype.contains = function(it) { return this.indexOf(it) != -1; }; }
// Browser compat for ajax requests
var xhttp;
if (window.XMLHttpRequest) {
	xhttp = new XMLHttpRequest();
	} else {
	// code for IE6, IE5
	xhttp = new ActiveXObject("Microsoft.XMLHTTP");
}

// function to check if string is stringified JSON
function isJSON(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function modInfo() {
	// Create popup window that allows for changing info.json
	temp = document.getElementById('popup');
	temp.innerHTML =
	'<h1>Info.json</h1>' +
	'<div class="input-control text"><input type="text" oninput="saveInfo(this)" class="name" value="' + info.name + '" placeholder="Technical modname"></div><br>' +
	'<div class="input-control text"><input type="text" oninput="saveInfo(this)" class="version" value="' + info.version + '" placeholder="Semantic version"></div><br>' +
	'<div class="input-control text"><input type="text" oninput="saveInfo(this)" class="title" value="' + info.title + '" placeholder="Graphical name of mod"></div><br>' +
	'<div class="input-control text"><input type="text" oninput="saveInfo(this)" class="author" value="' + info.author + '" placeholder="Mod author"></div><br>' +
	'<div class="input-control text"><input type="text" oninput="saveInfo(this)" class="description" value="' + info.description + '" placeholder="Description"></div><br>'
	if(temp.style.display == 'none') {
		temp.style.display = 'block';
	} else {
		temp.style.display = 'none';
	}
}
// used by modinfo only
function saveInfo(tosave) {
	info[tosave.className] = tosave.value;
}
// Function to expand/minimize prototypes
// for use by newPrototype()
// parameter is HTML dom element clicked on (the bar on the side of items)
function onclickstring(parameter, action) {
	// console.log(parameter);
	minProtoHeight = 34;
	if (!action){ // if not specified, default to toggle
		if(parameter.parentElement.style.height == minProtoHeight + "px"){
			parameter.parentElement.style.height = (29 * parameter.parentElement.getElementsByTagName('div').length -29)/2 + "px";
			parameter.style.height = ((29 * parameter.parentElement.getElementsByTagName('div').length -29)/2)-2 + "px";
		} else {
			parameter.parentElement.style.height = minProtoHeight + "px";
			parameter.style.height = minProtoHeight - 2 + "px";
		}
	} else if(action == 'minimize') { // Minimize only if asked to do so
		parameter.parentElement.style.height = minProtoHeight + "px";
		parameter.style.height = minProtoHeight - 2 + "px";
	} else if(action == 'maximize') { // Maximize if asked to do so
		parameter.parentElement.style.height = (29 * parameter.parentElement.getElementsByTagName('div').length -29)/2 + "px";
		parameter.style.height = ((29 * parameter.parentElement.getElementsByTagName('div').length -29)/2)-2 + "px";
	}
}
function minimizePrototypes(action) {
	temp = document.getElementsByClassName('expander');
	if(action){
		for(u = 0; u < temp.length; u++) {
			onclickstring(temp[u], action);
		}
	} else {
		for(u = 0; u < temp.length; u++) {
			onclickstring(temp[u], action);
		}
	}
}
function newPrototype(id) {
	var result = "";
	temp = prototypes[id].constructor.keys(prototypes[id]);
	var newPrototypeID = prototypes.length;
	// tried replacing stupid Math.random with something that won't fail, thats why you still see traces of stupidity
	for (o = 0; o < temp.length;o++) {
		if(typeof prototypes[id][temp[o]] == 'object') {
			console.log('Property of prototype is an object');
			tempTwo = JSON.stringify(prototypes[id][temp[o]]);
		} else {
			tempTwo = prototypes[id][temp[o]];
		}
		console.log(tempTwo);
		if (!prototypes[newPrototypeID]) {
			prototypes[newPrototypeID] = {};
		}
		prototypes[newPrototypeID][temp[o]] = tempTwo;
		result = result + "<div><div class='property input-control text'><input type='text' class='value input-control text' value='" + tempTwo + "'" +
		" oninput='save(this); onchange='lint();'" +
		"></input></div><p class='index'>" + temp[o] + "</p></div>";
	}
	// Add new HTML prototype
	// Using standard DOM methods instead of the hacky innerHTML = innerHTML + string
	// to avoid resetting the input fields when new prototypes are added.
	// Create DOM element
	temp = document.createElement('div');
	// Add our string HTML to the in-memory DOM element
	temp.innerHTML = "<div class='prototype' id='" + newPrototypeID + "'><div class='expander' onclick='onclickstring(this)'></div>" + result + "</div>";
	// Append the DOM element
	document.getElementById('window').appendChild(temp);
	// Reset temp variable
	temp = null;
}

// function to load mod from localstorage, save it in variable "prototypes" and draw it on the screen
function load() {
	// load it from localStorage
	prototypes = {};
	prototypes = JSON.parse(localStorage.mod);
	info = {};
	info = JSON.parse(localStorage.info);
	
	// loop through all properties and draw to screen
	// k should start checking at a higher number than the last ID of the presets
	// to avoid involuntary creation of invalid prototypes
	for(k = presetPrototypeLength; k < prototypes.length;k++) {
		// console.log(k)
		if (prototypes[k]) {
			// console.log(prototypes[k].constructor.keys(prototypes[k]))
			console.log("loaded: " + k)
			var result = "";
			temp = prototypes[k].constructor.keys(prototypes[k]);
			for (o = 0; o < temp.length;o++) {
				temp = prototypes[k].constructor.keys(prototypes[k]);
				result = result + "<div><div class='property input-control text'><input type='text' class='value input-control text' value='" + prototypes[k][temp[o]] + "'" +
				" oninput='save(this);' onchange='lint();'" +
				"></input></div><p class='index'>" + temp[o] + "</p></div>";
			}

			// Add new HTML prototype
			// Using standard DOM methods instead of the hacky innerHTML = innerHTML + string
			// to avoid resetting the input fields when new prototypes are added.

			// Create DOM element
			temp = document.createElement('div');
			// Add our string HTML to the in-memory DOM element
			
			temp.innerHTML = "<div class='prototype' id='" + k + "'><div class='expander' onclick='onclickstring(this)'></div>" + result + "</div>";
			// console.log(temp); // logging doesen't releal much
			// Append the DOM element
			document.getElementById('window').appendChild(temp);
			// Reset temp variable
			temp = null;
		}
	}
}
// not related to the "save" button on the site
// this function is ran on property input field.oninput
function save(protoTwo) {
	// protoTwo is a reference to HTML prototype
	
	// Log the HTML element that executes save()
	// console.log(protoTwo)
	proto = protoTwo.parentNode.parentNode.parentNode;
	// console.log('Saving ' + index + ': ' + value + " - " + proto.id);
	if(prototypes[proto.id]){
		prototypes[proto.id][protoTwo.parentElement.parentElement.getElementsByClassName("index")[0].innerHTML] = protoTwo.value;
		lint(proto.id);
	} else { // if you hit a prototype and its the wrong one log that
		console.log('FATAL ERROR PLEASE REFRESH');
	}
}
// this is where the magic happens
function exportMod() {
	// This is where all the prototypes are saved to
	modExport = {data:[],};
	// Loop through all HTML prototypes
	exportPrototypes = document.getElementsByClassName("prototype");
	for (i = 0;exportPrototypes.length > i; i++) {
		// save each prototype as modExport and then ship them to the server for conversion
		exportProperties = exportPrototypes[i].getElementsByClassName("property");
		modExport.data[i] = {};
		
		// Loop through the properties of every HTML prototype
		for (p=0;exportProperties.length > p; p++) {
			console.log(exportProperties[p].parentElement.getElementsByClassName("index")[0].innerHTML);
			if(isJSON(exportProperties[p].getElementsByClassName("value")[0].value)) {
				modExport.data[i][exportProperties[p].parentElement.getElementsByClassName("index")[0].innerHTML] = JSON.parse(exportProperties[p].getElementsByClassName("value")[0].value);
			} else {
				modExport.data[i][exportProperties[p].parentElement.getElementsByClassName("index")[0].innerHTML] = exportProperties[p].getElementsByClassName("value")[0].value;
			}
		}
		modExport.info = info;
	}
	
	// Ask server to convert JS to lua
	xhttp.open("POST", "/js2lua", true);
	xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
	// Callback when request is done
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			document.getElementById("result").innerHTML = "<a href='http://localhost:8080/" + xhttp.responseText + "'>Download " + xhttp.responseText + "</a>";
		}
	};
	xhttp.send(JSON.stringify(modExport));
}

// get us some default prototypes we can clone and edit
var prototypes = [];
prototypes[0] = {
	name : "steel-processing",
	type : "technology",
	icon : "__base__/graphics/technology/steel-processing.png",
	effects : [
		{type : "unlock-recipe",recipe : "steel-plate"},
		{type : "unlock-recipe",recipe : "steel-chest"},
		{type : "unlock-recipe",recipe : "steel-axe"},
	],
	unit : {count : 50,ingredients : ["science-pack-1", 1],time : 5},
	order : "c-a"
}
prototypes[1] = {
	name : "raw-wood",
	type : "item",
	icon : "__base__/graphics/icons/raw-wood.png",
	flags : '["goes-to-main-inventory"]',
	fuel_value : "4MJ",
	subgroup : "raw-material",
	order : "a[raw-wood]",
	stack_size : 100,
}
prototypes[2] = {
	name : "express-transport-belt",
	type : "recipe",
	category : "crafting-with-fluid",
	enabled : false,
	ingredients : [["iron-gear-wheel", 5],["fast-transport-belt", 1],{type:"fluid", name:"lubricant", amount:2}],
	result : "express-transport-belt",
	requester_paste_multiplier : 4,
}
prototypes[3] = {
	type : "item",
	name : "steel-chest",
	icon : "__base__/graphics/icons/steel-chest.png",
	flags : ["goes-to-quickbar"],
	subgroup : "storage",
	order : "a[items]-c[steel-chest]",
	place_result : "steel-chest",
	stack_size : 50,
}
prototypes[4] = {
	type : "item",
	name : "diesel-locomotive",
	icon : "__base__/graphics/icons/diesel-locomotive.png",
	flags : ["goes-to-quickbar"],
	subgroup : "transport",
	order : "a[train-system]-f[diesel-locomotive]",
	place_result : "diesel-locomotive",
	stack_size : 5,
}
prototypes[5] = {
	type : "tool",
	name : "science-pack-1",
	icon : "__base__/graphics/icons/science-pack-1.png",
	flags : ["goes-to-main-inventory"],
	subgroup : "science-pack",
	order : "a[science-pack-1]",
	stack_size : 200,
	durability : 1,
	durability_description_key : "description.science-pack-remaining-amount",
}
prototypes[6] = {
	type : "blueprint",
	name : "blueprint",
	icon : "__base__/graphics/icons/blueprint.png",
	flags : ["goes-to-quickbar"],
	subgroup : "tool",
	order : "c[automated-construction]-a[blueprint]",
	stack_size : 1,
	stackable : false,
	draw_label_for_cursor_render : true,
	item_to_clear : "electronic-circuit",
	selection_color : { r : 0, g : 1, b : 0 },
	alt_selection_color : { r : 0, g : 1, b : 0 },
	selection_mode : ["blueprint"],
	alt_selection_mode : ["blueprint"],
	selection_cursor_box_type : "copy",
	alt_selection_cursor_box_type : "copy",
}
prototypes[7] = {
	type : "deconstruction-item",
	name : "deconstruction-planner",
	icon : "__base__/graphics/icons/deconstruction-planner.png",
	flags : ["goes-to-quickbar"],
	subgroup : "tool",
	order : "c[automated-construction]-b[deconstruction-planner]",
	stack_size : 1,
	selection_color : { r : 1, g : 0, b : 0 },
	alt_selection_color : { r : 0, g : 0, b : 1 },
	selection_mode : ["deconstruct"],
	alt_selection_mode : ["cancel-deconstruct"],
	selection_cursor_box_type : "not-allowed",
	alt_selection_cursor_box_type : "not-allowed",
}
prototypes[8] = {
	type : "blueprint-book",
	name : "blueprint-book",
	icon : "__base__/graphics/icons/blueprint-book.png",
	flags : ["goes-to-quickbar"],
	subgroup : "tool",
	order : "c[automated-construction]-c[blueprint-book]",
	stack_size : 1,
	inventory_size : 30
}
prototypes[9] = {
	type : "technology",
	name : "rocket-damage-3",
	icon : "__base__/graphics/technology/rocket-damage.png",
	effects :
	[
	  {
		type : "ammo-damage",
		ammo_category : "rocket",
		modifier : "0.2"
	  }
	],
	prerequisites : ["rocket-damage-2"],
	unit :
	{
	  count : 100,
	  ingredients :
	  [
		["alien-science-pack", 1],
		["science-pack-1", 1],
		["science-pack-2", 1],
		["science-pack-3", 1]
	  ],
	  time : 60
	},
	upgrade : true,
	order : "e-j-c",
}
// Store how many preset prototypes we got at loadtime (we don't want to include these when saving/loading)
var presetPrototypeLength = prototypes.length;
// Place default prototypes into the GUI
window.onload = function() {
	for(j=0; j < prototypes.length;j++) {
		if(!prototypes[j].type) {
			console.log('FATAL ERROR FALSish TYPE');
		} else if(document.getElementById(prototypes[j].type)) {
			document.getElementById(prototypes[j].type).innerHTML = document.getElementById(prototypes[j].type).innerHTML + '<option id="' + j + '">' + prototypes[j].name + '</option>';
		} else if(!document.getElementById(prototypes[j].type)) {
			document.getElementById('other').innerHTML = document.getElementById('other').innerHTML + '<option id="' + j + '">' + prototypes[j].name + '</option>';
		}
	}
}
var info = {
	name: 'testMod',
	version: '0.0.1',
	factorio_version: '0.13',
	title: 'Test mod',
	author: 'Danielv123',
	description: 'Test mod made with FMM',
};

// {type : "item",name : "raw-wood",icon : "__base__/graphics/icons/raw-wood.png",flags : '["goes-to-main-inventory"]',fuel_value : "4MJ",subgroup : "raw-material",order : "a[raw-wood]",stack_size : 100,}
