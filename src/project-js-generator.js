//Makes project.js files based on options provided.
var optionsStuff = [
	////////////////////////////////////////////
	{
		type:"comment",
		text:"Tab options."
	},
	////////////////////////////////////////////
	{
		type:"value",
		id: "title",
		code: "document.title",
		placeholder: ""
	},
	{
		type:"functionvalue",
		id: "favicon",
		generate: function (val) {
			return `(function () {var link = document.createElement("link");link.rel = "icon";document.head.append(link);link.href = ${JSON.stringify(val)};})();`;
		},
		placeholder: ""
	},
	////////////////////////////////////////////
	{
		type:"comment",
		text:"TurboWarp options."
	},
	////////////////////////////////////////////
	{
		type:"value",
		id: "cloneLimit",
		code: "options.cloneLimit",
		placeholder: true
	},
	{
		type:"value",
		id: "miscLimits",
		code: "options.miscLimits",
		placeholder: true
	},
	{
		type:"value",
		id: "fps",
		code: "options.fps",
		placeholder: 30
	},
	{
		type:"value",
		id: "fencing",
		code: "options.fencing",
		placeholder: true
	},
	{
		type:"value",
		id: "stageWidth",
		code: "options.width",
		placeholder: 480
	},
	{
		type:"value",
		id: "stageHeight",
		code: "options.height",
		placeholder: 360
	},
	{
		type:"value",
		id: "warpTimer",
		code: "options.warpTimer",
		placeholder: false
	},
	{
		type:"value",
		id: "enableCompiler",
		code: "options.enableCompiler",
		placeholder: true
	},
	{
		type:"value",
		id: "highQualityPen",
		code: "options.highQualityPen",
		placeholder: false
	},
	////////////////////////////////////////////
	{
		type:"comment",
		text:"Player options."
	},
	////////////////////////////////////////////
	{
		type:"value",
		id: "useTurbomode",
		code: "options.useTurbomode",
		placeholder: false
	},
	{
		type:"value",
		id: "hideCursor",
		code: "options.hideCursor",
		placeholder: false
	},
	{
		type:"value",
		id: "clickToStart",
		code: "options.clickToStart",
		placeholder: true
	},
	
	{
		type:"comment",
		text:"Loading screen options."
	},
	
	{
		type:"value",
		id: "loadingImage",
		code: "options.loadingImage",
		placeholder: null
	},
	{
		type:"value",
		id: "progressBar",
		code: "options.progressBar",
		placeholder: true
	},
	{
		type:"value",
		id: "progressBarColors",
		code: "options.progressBarColors",
		placeholder: true
	},
	////////////////////////////////////////////
	{
		type:"comment",
		text:"DATA WARNING! This may contain lots of JSON file data below, if the option for saving via \"project.js\" file has been checked. This may crash most text editors, be careful when browsing data for large heaps of Data URLS."
	},
	////////////////////////////////////////////
	{
		type:"value",
		id: "assetList",
		code: "options.dataURIS",
		placeholder: {}
	},
	////////////////////////////////////////////
];
module.exports = function (options) {
	var code = "//This script was auto generated via Gvbvdxx Mod 2 Packager, it's advised not to edit this script if you don't know what you are doing here.\n(function () {\n\tvar options = {};\n\tvar colors = GM2Player.colors;\n\t//////////////////////\n";
	for (var opt of optionsStuff) {
		code += "\t";
		if (opt.type == "comment") {
			code += "//";
			code += opt.text;
		}
		if (opt.type == "value") {
			code += opt.code;
			code += " = ";
			var value = opt.placeholder;
			if (typeof options[opt.id] !== "undefined") {
				value = options[opt.id];
			}
			if ((typeof value == "object") || (typeof value == "string")) {
				//This is so it's much easier to input JSON properties.
				value = JSON.stringify(value);
			}
			//Write the value to the code.
			code += value;
			//Not required, but for formatting sake, just put an ";" at the end of things.
			code += ";";
		}
		if (opt.type == "functionvalue") {
			var value = opt.placeholder;
			if (typeof options[opt.id] !== "undefined") {
				value = options[opt.id];
			}
			code += opt.generate(value);
		}
		code += "\n";
	}
	code += "\n\t//////////////////////\n\tGM2Player.setOptions(options);\n\tGM2Player.start(document.getElementById('Player'));\n})();";
	return code;
};