function createSpan(text, opts) {
    return {
        element: "span",
        textContent: text,
        ...opts
    };
}

function createSelectibleWithStuff(title, headerText, childrens, id) {
    return {
        element: "div",
        className: "infoDiv",
        children: [{
                element: "br"
            },
            createSpan(headerText, {
                style: {
                    fontWeight: "bold"
                }
            }),
        ].concat(childrens).concat([{
                    element: "br"
                },
                createSpan(title), {
                    element: "br"
                }, {
                    element: "br"
                },
            ])
    };
}
function createCheckBoxWithStuff(title, text, id, checked) {
    var end = {};
    if (checked) {
        end = {
            checked: checked
        };
    }
    return createSelectibleWithStuff(title, text, [{
                element: "input",
                type: "checkbox",
                gid: id,
                ...end
            }
        ], id);
}
function createColorPickerWithStuff(title, text, id, color) {
    var end = {};
    if (color) {
        end = {
            value: color
        };
    }
    return createSelectibleWithStuff(title, text, [{
                element: "input",
                type: "color",
                gid: id,
                ...end
            }
        ], id);
}
function createNumberBoxWithStuff(title, text, id, def, max, min) {
    var output = createSelectibleWithStuff(title, text, [{
                element: "input",
                type: "number",
                value: def,
                min: min,
                max: max,
                gid: id
            }
        ], id);
	return output;
}

function createTextBoxWithStuff(title, text, id, def) {
    return createSelectibleWithStuff(title, text, [{
                element: "input",
                type: "text",
                value: def,
				gid:id
            }
        ], id);
}

var createDivSep = require("src/ui/border-stuff.js");

module.exports = [
    createDivSep("calc(100% - 8px)"), {
        element: "span",
        textContent: "Customization settings",
        style: {
            fontSize: "30px",
            width: "100%",
            fontWeight: "bold"
        }
    }, {
        element: "br"
    },
    createDivSep("300px"),

    createTextBoxWithStuff(
        "This is the tabs title, this is like the below favicon but is the text for the tabs title displayed beside the Favicon.",
        "Tab title",
        "settings-title",
        "My packaged project"),
		
	createCheckBoxWithStuff(
        "Hides the cursor, this does not lock the mouse pointer so be aware of that.",
        "Hide Pointer",
        "settings-hideCursor"),
		
	createCheckBoxWithStuff(
        "Shows an green flag icon when you open the page, just like scratch does. This is enabled because of WebAudio not being able to play unless you have clicked or done a interaction with the page, disable if you don't care about audio playing before clicking.",
        "Click to start",
        "settings-ClickToStart",
		true),

    createSelectibleWithStuff(
        "This is the icon for the page on the tab, viewed in history, or on the bookmarks tab.",
        "Favicon (Tab Icon)",
        [{
                element: "input",
                type: "file",
                accept: "image/*",
                gid: "settings-favicon"
            }
        ]),
    createCheckBoxWithStuff(
        "Show the loading bar, showing how many assets are finished loading from the project.",
        "Loading bar",
        "settings-loadingBar",
        true),
    createSelectibleWithStuff(
        "If you provide a image here, this image will be shown while the project is loading.",
        "Background image while loading",
        [{
                element: "input",
                type: "file",
                accept: "image/*",
                gid: "settings-loadingImage"
            }
        ]),

    createDivSep("calc(100% - 8px)"), {
        element: "span",
        textContent: "Runtime settings",
        style: {
            fontSize: "30px",
            width: "100%",
            fontWeight: "bold"
        }
    }, {
        element: "br"
    },
    createSpan("Project options might get overwritten by project."),

    createDivSep("300px"),

    createNumberBoxWithStuff(
        "Sets the FPS (Frames per second) when running the project. Scratch projects run at 30 FPS by default, running at 60 FPS means it will run 2 times faster than default, only some projects are programmed properly with auto adjusting framerate! May break some projects if this is changed!",
        "Framerate:",
        "settings-FPS",
        30,
        250,
        1),
    createCheckBoxWithStuff(
        "Automatically turn on Turbo Mode when the project starts, if checked. Works like pressing Shift+Green Flag when starting the project.",
        "Auto enable Turbo Mode?",
        "settings-TurboMode"),
    createCheckBoxWithStuff(
        "High quality pen makes pen based projects look sharper, but may result into more computing power nessasary to make the pen look sharper. This does not effect any projects not using pen.",
        "High quality pen?",
        "settings-HighQualityPen"),

    createDivSep("300px"),

    createCheckBoxWithStuff(
        "Clone limitations prevent projects from creating more than 300 clones. This wont usally break all scratch projects, but ones that use this limit to an advantage might break if enabling this.",
        "Disable clone limit?",
        "settings-NoCloneLimit"),
    createCheckBoxWithStuff(
        "Fencing does not allow sprites grow and shrink much as they want, as well as move off the stage, so project creators dont lose their sprites while making scratch projects. Though there are work arounds for this in scratch, enabling this will not need a work around to be used in your project.",
        "Remove Fencing",
        "settings-NoFencing"),
    createCheckBoxWithStuff(
        "Removes sound effect limits and pen size limits.",
        "Remove Miscellaneous Limits",
        "settings-RemoveMiscellaneousLimits"),

    createDivSep("300px"),

    createCheckBoxWithStuff(
        "Disables the TurboWarp compiler. You may want to enable this if your having issues with running the project. Otherwise, you should never enable this.",
        "Disable compiler",
        "settings-NoCompiler"),
		
	createCheckBoxWithStuff(
        "Warp timer checks if a \"My Block\" script gets stuck, and tries to not freeze the page, some projects might need this.",
        "Warp Timer",
        "settings-WarpTimer",
		true),

    createDivSep("300px"),

    createNumberBoxWithStuff(
        "This is how long the stage is in pixels",
        "Stage width",
        "settings-stageWidth",
        480,
        2000,
        1),

    createNumberBoxWithStuff(
        "This is how tall the stage is in pixels",
        "Stage height",
        "settings-stageHeight",
        360,
        2000,
        1),
		
	createDivSep("calc(100% - 8px)"), {
        element: "span",
        textContent: "Export options",
        style: {
            fontSize: "30px",
            width: "100%",
            fontWeight: "bold"
        }
    }, {
        element: "br"
    },
    createDivSep("300px"),
	
	createCheckBoxWithStuff(
        "Save project with assets inside of the JS options file [project.js] (May take longer and more RAM to load project), disabling this will require loading from a website or a local host server.",
        "Save assets into project.js?",
        "settings-SaveIntoIndex",
		true),
		
	createDivSep("calc(100% - 8px)"), {
        element: "span",
        textContent: "Logging options",
        style: {
            fontSize: "30px",
            width: "100%",
            fontWeight: "bold"
        }
    }, {
        element: "br"
    },
    createDivSep("300px"),
	
	createCheckBoxWithStuff(
        "This logs more stuff, such as what asset failed and what assets are successfully downloaded or copied. This is helpful to devs, as this can explain what went wrong a bit easier.",
        "More Logging",
        "settings-MoreLoggingOutput",
		false),

    createDivSep("calc(100% - 8px)"), {
        element: "span",
        textContent: "Finalize packaging",
        style: {
            fontSize: "30px",
            width: "100%",
            fontWeight: "bold"
        }
    }, {
        element: "br"
    },
    createDivSep("300px"), {
        element: "b",
        textContent: "I have something to tell you before you click this button below:"
    }, {
        element: "br"
    }, {
        element: "span",
        textContent: "Note that your project when packaged can still be reversed back into the editor, so don't put any sensitive information (like passwords, emails, things that you don't want to share, etc.) in your project, even if your going to package it. Also this won't actually compile your code to HTML5 code, it only runs Gvbvdxx Mod 2 inside the HTML file with your project inside. Code variables are public meaning that they can be exploited in any way (multiplayer online, overpowerd players, cheats, etc). So it's not highly recommended you use this for all your netgames or use Gvbvdxx Mod 2 to create netgames that may possibly contain sensitive information. This packager is free, it's tools that are used to create the freeware, are also free, as well as Gvbvdxx Mod 2. If you have paid for any of this software, you have been scammed, call somebody for assistance to get your money back. If you agree, and want to continue, press \"Package this project\"."
    },
    createDivSep("300px"), {
        element: "button",
        gid: "packageButton",
        className: "buttonOrange",
        textContent: "Package"
    },
	{
        element: "button",
        gid: "downloadButton",
        className: "buttonOrange",
        textContent: "Download"
    },
	{
        element: "button",
        gid: "previewButton",
        className: "buttonOrange",
        textContent: "Preview"
    },
	createDivSep("calc(100% - 8px)"), {
        element: "span",
        textContent: "Package logs:",
        style: {
            fontSize: "30px",
            width: "100%",
            fontWeight: "bold"
        }
    }, {
        element: "br"
    },
	{
		element:"textarea",
		gid:"packagerLogs",
		disabled: "true",
		style: {
			background: "#fff85b",
			width:"calc(100% - 7px)",
			height:"500px",
			resize: "none",
			borderRadius: "7px"
		}
	}
];
