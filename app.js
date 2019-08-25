const graphWidth = 600;
const graphHeight = 200;
const padding = 5;
const svg = d3.select("#graph");
d3.select("#graph").attr("height", graphHeight);
d3.select("#graph").attr("width", graphWidth);

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
	let frequencies = getFrequencies(letter);
	let maxFrequency = getMaxFreq(frequencies);
	let currGraphHeight = maxFrequency > 8 ? graphHeight + 20 * (maxFrequency - 8) : graphHeight;
	svg.attr("height", currGraphHeight);
	let data = svg
			     .selectAll("g")
			     .data(frequencies, d => d.character);

	data
			.classed("new", false)
		.exit()
		.remove();

	let barWidth = graphWidth / frequencies.length - padding;

	let letterEnter = data
	  .enter()
	  .append("g")
	  .classed("new", true);

	letterEnter.append("rect");
	letterEnter.append("text");

	letterEnter.merge(data)
		.select("rect")
		  .attr("x", (d, i) => (barWidth + padding) * i)
		  .attr("y", d => currGraphHeight - d.count * 20)
		  .attr("height", d => d.count * 20)
		  .attr("width", barWidth);

	letterEnter.merge(data)
		.select("text")
			.text(d => d.character)
			.attr("x", (d,i) => (barWidth + padding) * i + barWidth / 2)
			.attr("y", d => currGraphHeight - (d.count * 20 + 10))
			.attr("text-anchor", "middle");

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

function getMaxFreq(frequencies) {
	return frequencies.reduce((acc, next) => {
		if (next.count > acc) acc = next.count;
		return acc;
	}, 0);
}

d3.select("#reset-btn").on("click", () => {
	clear();
});

function clear() {
	d3.select("#letter").text("");
	d3.select("#count").text("");
	d3.selectAll("rect").remove();
}