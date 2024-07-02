/* Basicly makes the ui of the packager really work.*/
var html = require("elements");
var gconsole = require("log");
var projectLoader = require("src/project-downloader.js");
var packageReal = require("src/package-real.js");

//options for the packager.

var pkgOptions = { //tempomary options for packager to keep up with, so when they are compiled, they will be seen.
	project:"file",
	projectZip:null
};
//set some variables containing the elements, organized by diffrent screens.
var pdui = {
	modes:{
		download:html.getGPId("projectModeURL"),
		file:html.getGPId("projectModeFile")
	},
	projectDownloadID:html.getGPId("projectDownloadID"),
	loadingError:html.getGPId("loadError"),
	loadButton:html.getGPId("loadProjectButton"),
	projectFile:html.getGPId("projectFile"),
	loadingProject:html.getGPId("loadingProject"),
	projectLoadProgress:html.getGPId("projectLoadProgress"),
	internetNotice:html.getGPId("internetNotice"),
	packagerScreenProject:html.getGPId("packagerScreenProject"),
	packageButton:html.getGPId("packageButton"),
	downloadButton:html.getGPId("downloadButton"),
	packageLogs:html.getGPId("packagerLogs"),
	previewButton:html.getGPId("previewButton")
};
//here is the real code.

//hide some stuff.
pdui.loadingProject.hidden = true;
pdui.internetNotice.hidden = true;

//handle when the radio buttons are pushed.

pdui.modes.download.addEventListener("change", () => {
	if (pdui.modes.download.checked) {
		pkgOptions.project = "download";
	}
});
pdui.modes.file.addEventListener("change", () => {
	if (pdui.modes.file.checked) {
		pkgOptions.project = "file";
	}
});
//I don't know why, but it feels unproffesional to use set interval on a project like this, ..just me.... ok.
setInterval(() => {
	pdui.internetNotice.hidden = (pkgOptions.project == "file");
},1000/60)

if (pkgOptions.project == "file") {
	pdui.modes.download.checked = false;
	pdui.modes.file.checked = true;
} else {
	pdui.modes.download.checked = true;
	pdui.modes.file.checked = false;
}

//handles progress bar stuff.
var projectProgress = html.getGPId("projectProgress");

function projectloadprocess(type,value1,value2) {
	if (type == "progress") {
		projectProgress.value = value1;
		projectProgress.min = 0;
		projectProgress.max = value2;
	}
	if (type == "init") {
		projectProgress.value = null;
		projectProgress.min = null;
		projectProgress.max = null;
	}
}

//makes it when you press the "load project" button, it will load the project.
pdui.loadingError.textContent = "";
pdui.loadButton.addEventListener("click", async () => {
	pdui.loadButton.hidden = true;
	pdui.loadingProject.hidden = false;
	pdui.loadingError.textContent = "";
	if (pkgOptions.project == "file") {
		if (pdui.projectFile.files[0]) {
			var reader = new FileReader();
			reader.onload = async function () {
				try{
					pkgOptions.projectZip = await projectLoader.loadFile(reader.result);
					gconsole.log("Project load from file complete.");
					pdui.loadButton.hidden = false;
					pdui.loadingProject.hidden = true;
					pdui.packagerScreenProject.hidden = false;
				}catch(e){
					console.error(e);
					pdui.loadingError.textContent = "Error! The project file was unable to be loaded!";
					pdui.loadButton.hidden = false;
					pdui.loadingProject.hidden = true;
					pdui.packagerScreenProject.hidden = true;
				}
			};
			reader.readAsArrayBuffer(pdui.projectFile.files[0]);
		} else {
			console.error("Project file not selected!");
			pdui.loadingError.textContent = "Project file not selected!";
			pdui.loadButton.hidden = false;
			pdui.loadingProject.hidden = true;
			pdui.packagerScreenProject.hidden = true;
		}
	} else {
		try{
			pkgOptions.projectZip = await projectLoader.downloadFile(pdui.projectDownloadID.value,projectloadprocess);
			gconsole.log("Project download complete.");
			pdui.loadButton.hidden = false;
			pdui.loadingProject.hidden = true;
			pdui.packagerScreenProject.hidden = false;
		}catch(e){
			console.error(e);
			pdui.loadingError.textContent = "The project was unable to be downloaded!";
			pdui.loadButton.hidden = false;
			pdui.packagerScreenProject.hidden = true;
			pdui.loadingProject.hidden = true;
		}
	}
});

//im too lazy to discribe the stuff below.

function blobToBase64URL(blob, callback) {
  var reader = new FileReader();
  reader.onload = function() {
    var dataUrl = reader.result;
    var base64 = dataUrl;
    callback(base64);
  };
  reader.readAsDataURL(blob);
}

function blobToBase64URLAsync(blob) {
	return new Promise((accept,reject) => {
		if (blob instanceof Blob) {
			blobToBase64URL(blob,accept);
		} else {
			accept();
		}
	});
}

var mimeTypes = require("src/mime-types.js");

async function generateAssetList(projectzip,msg,advanced) {
	msg(`Generating project asset list...`);
	var list = {};
	for (var name in projectzip.files) {
		if (advanced){msg(`Writing project asset "${name}" to list...`);}
		var file = projectzip.files[name];
		var base64 = await file.async("base64");
		var type = mimeTypes[name.split(".").pop()];
		if (!type) {
			type = "text/plain";
		}
		var url = "data:"+type+";base64,"+base64;
		list[name] = url;
	}
	msg(`Finished generating project asset list.`);
	return list;
}

async function getOptions(logmsg) {
	var loadingbg = html.getGPId("settings-loadingImage");
	var favicon = html.getGPId("settings-favicon");
	var name = html.getGPId("settings-title");
	var loadingBar = html.getGPId("settings-loadingBar");
	var hideCursor = html.getGPId("settings-hideCursor");
	var clickToStart = html.getGPId("settings-ClickToStart");

	var fps = html.getGPId("settings-FPS");
	var turbo = html.getGPId("settings-TurboMode");
	var hdpen = html.getGPId("settings-HighQualityPen");
	var disableclones = html.getGPId("settings-NoCloneLimit");
	var fencing = html.getGPId("settings-NoFencing");
	var otherLimits = html.getGPId("settings-RemoveMiscellaneousLimits");
	var noCompiler = html.getGPId("settings-NoCompiler");
	var stageWidth = html.getGPId("settings-stageWidth");
	var warp = html.getGPId("settings-WarpTimer");
	var stageHeight = html.getGPId("settings-stageHeight");
	
	var advancedLogs = html.getGPId("settings-MoreLoggingOutput");
	
	var urilist = {};
	var saveindex = html.getGPId("settings-SaveIntoIndex");
	var zip = pkgOptions.projectZip;
	if (saveindex.checked) {
		urilist = await generateAssetList(zip,logmsg,advancedLogs.checked);
		zip = null;
	}
	
	var fpsint = Number(fps.value);
	if (isNaN(fpsint)) {
		fpsint = 30;
	}
	if (fpsint < 1) {
		fpsint = 1;
	}
	if (fpsint > 250) {
		fpsint = 250;
	}
	
	var width = Number(stageWidth.value);
	if (isNaN(width)) {
		width = 30;
	}
	if (width < 1) {
		width = 1;
	}
	
	var height = Number(stageHeight.value);
	if (isNaN(height)) {
		height = 30;
	}
	if (height < 1) {
		height = 1;
	}
	return {
		jsfileops: {
			assetList:urilist,
			
			loadingImage: await blobToBase64URLAsync(loadingbg.files[0]),
			favicon: await blobToBase64URLAsync(favicon.files[0]),
			title: name.value,
			
			cloneLimit: !disableclones.checked,
			miscLimits: otherLimits.checked,
			fps: fpsint,
			fencing: !fencing.checked,
			stageWidth: width,
			stageHeight: height,
			warpTimer: warp.checked,
			enableCompiler: !noCompiler.checked,
			highQualityPen: hdpen.checked,
			
			useTurbomode: turbo.checked,
			hideCursor: hideCursor.checked,
			clickToStart: clickToStart.checked
		},
		zip: zip,
		advancedLogs: advancedLogs.checked
	};
}
function doText(...args) {
	var truetext = "";
	for (var arg of args) {
		truetext += arg;
		truetext += " ";
	}
	truetext += "\n";
	pdui.packageLogs.value += truetext;
}

var zipblob = new Blob([]);
var outputzip = {};

function downloadZipBlob() {
	var a = document.createElement("a");
	a.href = URL.createObjectURL(zipblob);
	a.download = "packaged project.zip";
	a.click();
}

async function packageNow() {
	pdui.packageLogs.value = "";
	var ogTextContent = pdui.packageButton.textContent;
	pdui.packageButton.onclick = null;
	try{
		doText("Processing options...");
		pdui.packageButton.textContent = "Waiting for package to finish...";
		var options = await getOptions(doText);
		doText("Packaging...");
		var zip = await packageReal(options, doText);
		doText("Generating zip...");
		zipblob = await zip.generateAsync({type: "blob"});
		pdui.downloadButton.hidden = false;
		outputzip = zip;
		doText("Done!");
		if (options.zip) {
			pdui.previewButton.hidden = true;
			doText("You've disabled the \"Save assets into project.js?\" option, you can't preview you're project if you've disabled the option.");
		} else {
			pdui.previewButton.hidden = false;
			doText("Click the preview button to preview your packaged output.");
		}
	} catch(e) {
		console.error("Packaging failed",e);
		doText("There was an error during the packaging I've stumbled appon. Packaging aborted. Error:",e.toString());
	}
	pdui.packageButton.onclick = packageNow;
	pdui.packageButton.textContent = ogTextContent;
};

pdui.downloadButton.hidden = true;
pdui.downloadButton.onclick = downloadZipBlob;
pdui.packageButton.onclick = packageNow;
pdui.previewButton.hidden = true;

pdui.previewButton.onclick = async function () {
	var page = window.open("about:blank","_blank","popup=yes");
	page.document.body.textContent = "Please wait, loading files...";
	var zip = outputzip;
	var gm2player = await zip.file("gm2player.js").async("text");
	var project = await zip.file("project.js").async("text");
	var html = `<noscript>Your browser does not support javascript, or it is disabled, please enable it.</noscript><div id="Player"></div>`;
	page.document.body.innerHTML = html;
	page.eval(gm2player);
	page.eval(project);
};