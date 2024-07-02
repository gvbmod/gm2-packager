var createDivSep = require("src/ui/border-stuff.js");

module.exports = [
	{
        element: "img",
        title: "Logo for Gvbvdxx Mod 2.",
		src: "static/images/logo.png",
        style: {
            width: "100%",
			maxWidth: "500px",
			display: "block",
			marginLeft: "auto",
			marginRight: "auto",
        }
    },
	{
        element: "span",
        textContent: "Project Packager",
        style: {
			display:"block",
            fontSize: "30px",
            textAlign: "center",
            width: "100%",
            fontWeight: "bold"
        }
    },
	{element:"br"},
	{
		element: "span",
		textContent: "Convert scratch projects to html, featuring support for Gvbvdxx Mod 2 extensions."
	},
	{element:"br"},
	{
		element: "span",
		style:{
			fontStyle:"italic"
		},
		textContent: "NOTE: This site is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation."
	},
	{element:"br"},
	createDivSep("500px"),
	{
		element:"div",
		gid:"packagerScreenMain",
		children: require("src/ui/loadScreen.js")
	},
	{
		element:"div",
		gid:"packagerScreenProject",
		hidden: true,
		children: require("src/ui/projectScreen.js")
	}
];
