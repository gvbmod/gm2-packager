var fs = require("fs");
var path = require("path");
var maindir = "static";
var data = {
	files:[]
};
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

function removePartFromBeginning (dir,thing) {
	var p = parsePathArray(dir);
	if (p[0].toLowerCase() == thing) {
		p = p.slice(1,p.length);
	}
	return p.join("/");
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
function scanDir(dir) {
    fs.readdirSync(dir).forEach((file) => {
		if (file == "assets") {
			return;
		}
        var absolute = path.join(dir, file);
        var status = fs.statSync(absolute);
        if (status.isDirectory()) {
            scanDir(absolute);
        } else {
			var p = path.join(maindir, absolute);
            data.files.push({
				request:makePathEasyToProcess(p),
				path:removePartFromBeginning(absolute,"player-build"),
			});
        }
    });
}

scanDir("./player-build/");

fs.writeFileSync("player-files.json", JSON.stringify(data, null, "  "));
