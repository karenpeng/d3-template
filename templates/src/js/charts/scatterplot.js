const margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960,
    height = 500;

const x = pad(d3.scale.linear()
    .range([0, width - margin.left - margin.right]), 40);

const y = pad(d3.scale.linear()
    .range([height - margin.top - margin.bottom, 0]), 40);

const xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickPadding(8);

const yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickPadding(8);

const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "dot chart")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + y.range()[0] + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

export function makeScatterPlot(data){
    console.dir(data)
    x.domain(d3.extent(data, (d) => { return +d.x; }))
    y.domain(d3.extent(data, (d) => { return +d.y; }))
    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", (d) => { return x(+d.x); })
        .attr("cy", (d) => { return y(+d.y); })
        .attr("r", 12);
}

function pad(scale, k) {
  const range = scale.range();
  if (range[0] > range[1]) k *= -1;
  return scale.domain([range[0] - k, range[1] + k].map(scale.invert)).nice();
}