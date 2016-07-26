// Register eventListeners
document.addEventListener("DOMContentLoaded", function(event) {
	//document.getElementById("modInfo").addEventListener("click", modInfo);
});

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

// for use by newPrototype()
// parameter is HTML dom element clicked on (the bar on the side of items)
function onclickstring(parameter) {
	// console.log(parameter);
	minProtoHeight = 34;
	if(parameter.parentElement.style.height == minProtoHeight + "px"){
		parameter.parentElement.style.height = (29 * parameter.parentElement.getElementsByTagName('div').length -29)/2 + "px";
		parameter.style.height = ((29 * parameter.parentElement.getElementsByTagName('div').length -29)/2)-2 + "px"
	} else {
		parameter.parentElement.style.height = minProtoHeight + "px";
		parameter.style.height = minProtoHeight - 2 + "px";
	}
}

function newPrototype(id) {
	k = id;
	var result = "";
	temp = prototypes[k].constructor.keys(prototypes[k]);
	var randomID = Math.round(Math.random() * 10000);
	for (o = 0; o < temp.length;o++) {
		temp = prototypes[k].constructor.keys(prototypes[k]);
		if(typeof prototypes[k][temp[o]] == 'object') {
			console.log('Property of prototype is an object');
			tempTwo = JSON.stringify(prototypes[k][temp[o]]);
		} else {
			tempTwo = prototypes[k][temp[o]];
		}
		console.log(tempTwo);
		if (!prototypes[randomID]) {
			prototypes[randomID] = {};
		}
		prototypes[randomID][temp[o]] = tempTwo;
		result = result + "<div><div class='property input-control text'><input type='text' class='value input-control text' value='" + tempTwo + "'" +
		" oninput='save(this);'" +
		"></input></div><p class='index'>" + temp[o] + "</p></div>";
	}
	// Add new HTML prototype
	// Using standard DOM methods instead of the hacky innerHTML = innerHTML + string
	// to avoid resetting the input fields when new prototypes are added.
	// Create DOM element
	temp = document.createElement('div');
	// Add our string HTML to the in-memory DOM element
	temp.innerHTML = "<div class='prototype' id='" + randomID + "'><div class='expander' onclick='onclickstring(this)'></div>" + result + "</div>";
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
	for(k = 5; k < prototypes.length;k++) {
		// console.log(k)
		if (prototypes[k]) {
			// console.log(prototypes[k].constructor.keys(prototypes[k]))
			console.log("loaded: " + k)
			var result = "";
			temp = prototypes[k].constructor.keys(prototypes[k]);
			for (o = 0; o < temp.length;o++) {
				temp = prototypes[k].constructor.keys(prototypes[k]);
				result = result + "<div><div class='property input-control text'><input type='text' class='value input-control text' value='" + prototypes[k][temp[o]] + "'" +
				" oninput='save(this);'" +
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
// this function is ran on property input field.change
function save(protoTwo) {
	// protoTwo is a reference to HTML prototype
	// index = string, name of JS object properto to change
	// value = string or int, value to change
	console.log(protoTwo)
	proto = protoTwo.parentElement.parentElement.parentElement;
	index = protoTwo.parentElement.parentElement.getElementsByClassName("index")[0].innerHTML;
	value = protoTwo.value;
	
	console.log('Saving ' + index + ': ' + value + " - " + proto.id);
	// Loop through prototypes checking for protos exclusive ID
	var found = 0;
	for(l = 0; l < prototypes.length; l++) {
		if(prototypes[l]) { // only trigger if array position corresponds to a prototype
			if(l == proto.id) { // loop until you are at the right prototype
				console.log('I found my brother!');
				found = l; // tell us when you finally found it
				prototypes[l][index] = value;
			} else { // if you hit a prototype and its the wrong one log that
				console.log('no match');
			}
		}
	}
	// console.log(proto.id);
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

var prototypes = [];

prototypes[0] = {
	name : "steel-processing",
	type : "technology",
	icon : "__base__/graphics/technology/steel-processing.png",
	effects : [{type : "unlock-recipe",recipe : "steel-plate"}],
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
	requester_paste_multiplier : 4
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
