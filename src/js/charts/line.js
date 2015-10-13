import d3 from 'd3'

const format = d3.time.format("%b %Y");

const margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960,
    height = 500;

const x = d3.time.scale()
    .range([0, width - margin.left - margin.right]);

const y = d3.scale.linear()
    .range([height - margin.top - margin.bottom, 0]);

const xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickPadding(8);

const yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickPadding(8);

const line = d3.svg.line()
//const area = d3.svg.area()
    .x((d) => { return x(d.date); })
    //.y0(y.range()[0])
    //.y1((d) => { return y(d.price); });
    .y((d) => { return y(d.price); });

export function makeLine(file){
  d3.csv(file, function(error, data) {
    if (error) throw error;

    data.forEach((d) => {
      d.price = +d.price;
      d.date = format.parse(d.date);
    });

    data = data.filter((d) => {
      return d.symbol == "S&P 500";
    });

    x.domain(d3.extent(data, (d) => { return d.date; }));
    //y.domain([0, d3.max(data, (d) => { return d.price; })]).nice();
    y.domain(d3.extent(data, (d) => { return d.price; }));

    const svg = d3.select("#chart").append("areaChart").append("svg")
        .datum(data)
        .attr("width", width)
        .attr("height", height)
        .attr("class", "time chart")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + y.range()[0] + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + x.range()[1] + ")")
        .call(yAxis);

    svg.append("path")
        .attr("class", "line")
        .attr("d", line);

  });
}
