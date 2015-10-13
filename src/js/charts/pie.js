import d3 from 'd3'

const margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960,
    height = 500,
    radius = Math.min(width, height) / 2;

const color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

const arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(60);

const pie = d3.layout.pie()
    .sort(d3.ascending)
    .value((d) => { return d.population; });

const svg = d3.select("body").append("pieChart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

export function makePie(file){

  d3.csv(file, function(error, data) {

    data.forEach((d) => {
      d.population = +d.population;
    });

    const g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", (d) => { return color(d.data.age); });

    g.append("text")
        .attr("transform", (d) => { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text((d) => { return d.data.age; });

  });

}
