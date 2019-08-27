const graphWidth = 600;
const graphHeight = 400;
const padding = 30;
const barPadding = 5;
const svg = d3.select("#graph")
				.attr("height", graphHeight)
				.attr("width", graphWidth);

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

	let yScale = d3.scaleLinear()
					 .domain([0, d3.max(frequencies, d => d.count)])
					 .rangeRound([graphHeight - padding, padding]);

	d3.select(".y-axis")
		.remove();

	svg.append("g")
		.attr("transform", "translate(" + padding + ", 0)")
		.classed("y-axis", true)
		.call(d3.axisLeft(yScale));

	let data = svg
			     .selectAll(".bar")
			     .data(frequencies, d => d.character);

	data
			.classed("new", false)
		.exit()
		.remove();

	let barWidth = (graphWidth - 2 * padding) / frequencies.length - barPadding;

	let letterEnter = data
	  .enter()
	  .append("g")
	  .classed("bar", true)
	  .classed("new", true);

	letterEnter.append("rect");
	letterEnter.append("text");

	let maxCount = d3.max(frequencies, d => d.count);
	let heightPerCount = (graphHeight - 2 * padding) / maxCount;

	letterEnter.merge(data)
		.select("rect")
		  .attr("x", (d, i) => (barWidth + barPadding) * i + padding)
		  .attr("y", d => graphHeight - padding - d.count * heightPerCount)
		  .attr("height", d => d.count * heightPerCount)
		  .attr("width", barWidth);

	letterEnter.merge(data)
		.select("text")
			.text(d => d.character)
			.attr("x", (d,i) => (barWidth + barPadding) * i + barWidth / 2 + padding)
			.attr("y", d => graphHeight - padding - d.count * heightPerCount - 5)
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
	d3.selectAll("g").remove();
}