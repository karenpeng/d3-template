import d3 from 'd3'

const margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960,
    height = 500;

const svg = d3.selectAll("#chart").append("barChart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "bar chart")
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scale.linear()
    .range([0, width - margin.left - margin.right]);

const y = d3.scale.ordinal()
    .rangeRoundBands([height - margin.top - margin.bottom, 0], .2);

const c = d3.scale.ordinal()


const xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickPadding(8);

const yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(0)
    .tickPadding(8);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + y.rangeExtent()[1] + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

export function makeBar(_data){

/**
 * config x and y mapping, and also making xAxis and yAxis
 */
    x.domain([0, d3.max(_data)])
    y.domain(d3.range(_data.length))

    d3.select(".y axis")
      .selectAll("text")
    .text((d) => { return String.fromCharCode(d + 65); });

    const bar = svg.selectAll(".bar")
        //.data(data, (d) => {return d})
        .data(_data)

    bar
      .exit()
      .remove()

    bar
      .enter().append("rect")
        .attr("class", "bar")
        .attr("y", (d, i) => { return y(i); })
        .attr("width", x)
        .attr("height", y.rangeBand());

    bar
        .attr("y", (d, i) => { return y(i); })
        .attr("width", x)
        .attr("height", y.rangeBand())
}





