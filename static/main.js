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

function modInfo() {
	// Create popup window that allows for changing info.json
	temp = document.getElementById('popup');
	temp.innerHTML =
	'<h1>Info.json</h1>' +
	'<div class="input-control text"><input type="text" value="' + info.name + '" placeholder="Technical modname"></div><br>' +
	'<div class="input-control text"><input type="text" value="' + info.version + '" placeholder="Semantic version"></div><br>' +
	'<div class="input-control text"><input type="text" value="' + info.title + '" placeholder="Graphical name of mod"></div><br>' +
	'<div class="input-control text"><input type="text" value="' + info.author + '" placeholder="Mod author"></div><br>' +
	'<div class="input-control text"><input type="text" value="' + info.description + '" placeholder="Description"></div><br>'
	if(temp.style.display == 'none') {
		temp.style.display = 'block';
	} else {
		temp.style.display = 'none';
	}
}

// for use by newPrototype()
// parameter is HTML dom element clicked on (the bar one the side of items)
function onclickstring(parameter) {
	if(parameter.parentElement.style.height == '40px'){
		parameter.parentElement.style.height = 35 * parameter.parentElement.querySelectorAll('input').length;
		parameter.style.height = parameter.parentElement.offsetHeight - 2
	} else {
		parameter.parentElement.style.height = '40px';
		parameter.style.height = parameter.parentElement.offsetHeight - 2
	}
}

function newPrototype(id) {
	for(k = 0; k < prototypes.length;k++) {
		// console.log(k)
		if (k == id) {
			var result = "";
			temp = prototypes[k].constructor.keys(prototypes[k]);
			var randomID = Math.round(Math.random() * 10000);
			for (o = 0; o < temp.length;o++) {
				temp = prototypes[k].constructor.keys(prototypes[k]);
				result = result + "<div class='property input-control text'><input type='text' class='value input-control text' value='" + prototypes[k][temp[o]] + "'" +
				" oninput='save(this.parentElement.parentElement, this.parentElement.getElementsByClassName(\"index\")[0].innerHTML, this.value)'" +
				"></input></div><p class='index'>" + temp[o] + "</p><br>";
				if (!prototypes[randomID]) {
					prototypes[randomID] = {};
				}
				prototypes[randomID][temp[o]] = prototypes[k][temp[o]];
			}

			// Add new HTML prototype
			// Using standard DOM methods instead of the hacky innerHTML = innerHTML + string
			// to avoid resetting the input fields when new prototypes are added.

			// Create DOM element
			temp = document.createElement('div');
			// Add our string HTML to the in-memory DOM element
			
			temp.innerHTML = "<div class='prototype' id='" + randomID + "'><div class='expander' onclick='onclickstring(this)'></div>" + result + "</div>";
			// console.log(temp); // logging doesen't releal much
			// Append the DOM element
			document.getElementById('window').appendChild(temp);
			// Reset temp variable
			temp = null;
		}
	}
}

// this function is ran on property input field.change
function save(proto, index, value) {
	// proto is a reference to HTML prototype
	// index = string, name of JS object properto to change
	// value = string or int, value to change
	console.log('Saving ' + index + ': ' + value);
	// Loop through prototypes checking for protos exclusive ID
	var found = 0;
	for(l = 0; l < prototypes.length; l++) {
		if(prototypes[l]) {
			if(prototypes[l].id == proto.id) {
				console.log('I found my brother!');
				found = l;
			} else {
				console.log('no match');
			}
		}
	}
	// console.log(proto.id);
	if (!prototypes[proto.id]) {
		prototypes[proto.id] = {};
	}
	prototypes[proto.id][index] = value;
}


// this is where the magic happens
function exportMod() {
	// This is where all the prototypes are saved to
	modExport = [];

	// Loop through all HTML prototypes
	exportPrototypes = document.getElementsByClassName("prototype");
	for (i = 0;exportPrototypes.length > i; i++) {
		// save each prototype as modExport and then ship them to the server for conversion
		exportProperties = exportPrototypes[i].getElementsByClassName("property");
		modExport[i] = {};

		// Loop through the properties of every HTML prototype
		for (p=0;exportProperties.length > p; p++) {
			console.log(exportProperties[p].getElementsByClassName("index")[0].innerHTML);
			modExport[i][exportProperties[p].getElementsByClassName("index")[0].innerHTML] = exportProperties[p].getElementsByClassName("value")[0].value;
		}
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

var info = {
	name: 'testMod',
	version: '0.0.1',
	title: 'Test mod',
	author: 'Danielv123',
	description: 'Test mod made with FMM',
};

// {type : "item",name : "raw-wood",icon : "__base__/graphics/icons/raw-wood.png",flags : '["goes-to-main-inventory"]',fuel_value : "4MJ",subgroup : "raw-material",order : "a[raw-wood]",stack_size : 100,}
