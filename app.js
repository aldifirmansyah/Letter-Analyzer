d3.select("#enter-btn").on("click", () => {
	generate();
});

d3.select("#letter-input").on("keydown", () => {
	if (d3.event.keyCode === 13) {
		generate();
	}
});

function generate() {
	let letterInput = d3.select("#letter-input");
	let letter = letterInput.property("value");
	letterInput.property("value", "");
	setLetter(letter);
	setGraphAndCount(letter);
}

function setLetter(letter) {
	d3.select("#letter").text("Analysis of: " + letter);
}

function setGraphAndCount(letter) {
	let data = d3.select("#graph")
			     .selectAll(".bar")
			     .data(getFrequencies(letter), d => d.character);

	data
			.classed("new", false)
		.exit()
		.remove();

	data
	  .enter()
	  .append("div")
		  .classed("bar", true)
		  .classed("new", true)
		  .text(d => d.character)
		.merge(data)
		  .style("height", d => d.count * 20 + "px");

	d3.select("#count").text("(New Character: " + data.enter().nodes().length + ")");
}

function getFrequencies(letter) {
	return letter.split("").sort().reduce((acc, next) => {
		if (acc.length > 0) {
			let last = acc[acc.length - 1];
			if (next === last.character) last.count++;
			else acc.push({character: next, count: 1});
		}
		else acc.push({character: next, count: 1});
		return acc;
	}, []);
}

d3.select("#reset-btn").on("click", () => {
	clear();
});

function clear() {
	d3.select("#letter").text("");
	d3.select("#count").text("");
	d3.selectAll(".bar").remove();
}