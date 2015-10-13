import d3 from 'd3'

const width = 500,
    height = 500, 
    margin = 50;

const svg=d3.select("body").append("svg").attr("width",width).attr("height",height);
const x=d3.scale.linear().domain([0,5]).range([margin,width-margin]);
const y=d3.scale.linear().domain([-10,10]).range([height-margin,margin]);
const r=d3.scale.linear().domain([0,500]).range([0,20]);
const o=d3.scale.linear().domain([10000,100000]).range([.5,1]);
const c=d3.scale.category10().domain(["Africa","America","Asia","Europe","Oceania"]);

const xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

const yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + (height - margin) + ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "axis")
   .attr("transform", "translate(" + margin + ",0)")
  .call(yAxis);

svg.selectAll(".h").data(d3.range(-8,10,2)).enter()
  .append("line").classed("h",1)
  .attr("x1",margin).attr("x2",height-margin)
  .attr("y1",y).attr("y2",y)
  
svg.selectAll(".v").data(d3.range(1,5)).enter()
  .append("line").classed("v",1)
  .attr("y1",margin).attr("y2",width-margin)
  .attr("x1",x).attr("x2",x)

export function makeBoss(file){
  d3.csv(file, (err, data) =>{
    data.sort((a, b)=>{
      return b.population - a.population
    })

  let circles = svg.selectAll('circle')
    .data(data)

  circles
    .exit()
    .remove()

  circles
    .enter()
    .append('circle')
    .attr('cx', (d)=> { return x(0)})
    .attr('cy', (d)=> { return y(0)})
    .attr('cx', (d)=> { return r(0)})
    .style("fill",function(d) {return c(d.continent);})
    .style("opacity",function(d) {return o(+d.GDPcap);})
    .append("title")
    .text(function(d) {return d.country;})


  circles
  .transition()
    .duration(1000)
    .attr("cx",function(d) {return x(+d.GERD);})
    .attr("cy",function(d) {return y(+d.growth);})
    .attr("r",function(d) {return r(Math.sqrt(+d.population));})

  })
}