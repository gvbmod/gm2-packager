//If this is hard to understand, all this does is downloads the assets from the build and saves an zip of it.
function makePathEasyToProcess(path) {
    var a = path.replaceAll("\\", "/").toLowerCase();
    if (a[0] == "." && a[1] == "/") {
        var i = 2;
        var parsedPath = "";
        while (i < a.length) {
            parsedPath += a[i];
            i += 1;
        }
    } else {
        var i = 0;
        var parsedPath = "";
        while (i < a.length) {
            parsedPath += a[i];
            i += 1;
        }
    }
    return parsedPath;
}
function parsePathArray(path) {
    var text = makePathEasyToProcess(path);
    var array = text.split("/");
    var fixedArray = []; //Cuts out empty "parts" of the array.
    for (var part of array) {
        if (part.length > 0) {
            fixedArray.push(part);
        }
    }
    return fixedArray;
}

function parsePath(p) {
    return parsePathArray(p).join("/");
}

function getDirname (p) {
	var path = parsePath(p);
	return path.split("/").slice(0,-1).join("/");;
}

function joinArray(...paths) {
    var outArray = [];
    for (var path of paths) {
        var array = parsePathArray(path);

        for (var part of array) {
            outArray.push(part);
            if (part == "..") {
                //Doing this twice because it pushed it to the end.
                outArray.pop();
                outArray.pop();
            }
            if (part == ".") {
                outArray.pop();
            }

        }
    }
    return parsePath(outArray.join("/"));
}

async function fetchJSON(url,options) {
	var response = await fetch(url,options);
	var text = await response.text();
	var json = JSON.parse(text);
	return json;
}

async function fetchArrayBuffer(url,options) {
	var response = await fetch(url,options);
	var arrayBuffer = await response.arrayBuffer();
	return arrayBuffer;
}

async function downloadPlayer(log,morelogging) {
	var text = log;
	if (!text) {
		text = function () {};
	}
	var index = await fetchJSON("static/player-files.json");
	var zip = new JSZip();
	for (var file of index.files) {
		if (morelogging) {
			text("Downloading project player asset \""+file.path+"\"...");
		}
		//Download the gm2player asset first.
		var buffer = await fetchArrayBuffer(file.request);
		//This makes sure the directory exists first, before we write the file.
		var constructedDir = [];
		var dirArray = parsePathArray(file.path);
		for (var dir of dirArray.slice(0,dirArray.length-1)) {
			zip.folder(constructedDir.join("/"));
			constructedDir.push(dir);
		}
		//Write the file to the zip.
		zip.file(file.path,buffer);
	}
	text("Successfully downloaded project player.");
	return zip;
}
module.exports = {};

module.exports.downloadZip = downloadPlayer;