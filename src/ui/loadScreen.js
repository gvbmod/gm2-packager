var createDivSep = require("src/ui/border-stuff.js");

module.exports = [
	{
		element:"span",
		textContent:"Choose project type:"
	},
		{element:"br"},
	{
		element:"div",
		children:[
			{
				element:"div",
				children:[
					{
						element:"input",
						type:"radio",
						name:"projectMode",
						gid:"projectModeURL"
					},
					{
						element:"span",
						textContent:"Download project from id:"
					},
					{
						element:"input",
						type:"number",
						title:"The number in the scratch project's url.",
						min:1,
						gid:"projectDownloadID",
						value:60917032
					}
				]
			},
			{
				element:"div",
				children:[
					{
						element:"input",
						type:"radio",
						name:"projectMode",
						gid:"projectModeFile"
					},
					{
						element:"span",
						textContent:"File:"
					},
					{
						element:"input",
						type:"file",
						gid:"projectFile",
						accept: ".sb3,.gm2"
					}
				]
			}
		]
	},
	{
		element:"b",
		style: {
			fontStyle:"italic"
		},
		gid: "internetNotice",
		textContent:"NOTICE: You must have internet to download Scratch projects, this also means that scratch.mit.edu and trampoline.turbowarp.org must not be blocked on your internet."
	},
	createDivSep("500px"),
	{
		element:"span",
		textContent:"You must load a project to continue."
	},
	{ element:"br" },
	{
		element:"button",
		gid:"loadProjectButton",
		className:"buttonOrange",
		textContent:"Load project."
	},
	{ element:"div", gid:"loadingProject", children:[
			{
				element:"span",
				textContent:"Loading project... (This may take a while if your project has alot of assets)"
			},
			{element:"br"}, { element: "progress", gid:"projectProgress", style: {width: "calc(100% - 8px)", height: "15px"}}
		]
	},
	{element:"br"},
	{
		element:"span",
		gid:"loadError",
		style:{
			color:"red",
			fontWeight:"bold"
		}
	}
];