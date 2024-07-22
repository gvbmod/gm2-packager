var puller = require("src/build-puller.js");
var gen = require("src/project-js-generator.js");
var file = require("file-loader");
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
async function packageFunction(options,logText) {
	var zip = await puller.downloadZip(logText,options.advancedLogs);
	logText("Downloading project player...");
	var sb3 = options.zip;
	if (sb3) {
		zip.folder("assets");
		logText("Storing assets into seperate folder...");
		for (var name in sb3.files) {
			if (options.advancedLogs) {
				logText("Storing \""+name+"\"...");
			}
			zip.file(joinArray("assets",name),await sb3.files[name].async("arrayBuffer"));
		}
	} else {
		try{
		zip.remove("assets");
		}catch(e){}
	}
	logText(`Generating "project.js"...`);
	var projectjs = gen(options.jsfileops);
	logText(`Writing "project.js"...`);
	zip.file("project.js",projectjs);
	logText(`Writing "index.html"...`);
	zip.file("index.html",file.read("src/template-html.html"));
	return zip;
}

module.exports = packageFunction;