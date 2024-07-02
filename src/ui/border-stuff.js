function createDivSep(width) {
	return {
		element:"div",
		style:{
			minWidth:"50px",
			maxWidth:"100%",
			width:width,
			borderStyle:"solid",
			borderRadius:"1px",
			borderColor:"#e5e9f0",
			borderWidth:"3px",
			marginTop: "10px",
			marginBottom: "10px",
		}
	};
}

module.exports = createDivSep;