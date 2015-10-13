import d3 from 'd3'

// const data = [
//   {name: 'karen', score:[1,4,3,5,6,3,2]},
//   {name: 'ian', score:[2,5,2,1,4,6,5,3]},
//   {name: 'drew', score:[4,1,2,3,4,7,5,4]}

// ]

//before data
const margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 960,
    height = 500;

const x = d3.scale.linear()
  .range([0, width - margin.left - margin.right])

const c = d3.scale.linear()
  .range([0, 100])

const svg = d3.select("#chart")
  .append("svg")
  .attr("class", "matrix")
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



function myMax(arr){
    return d3.max(arr, function(a){
      return d3.max(a.score)
    })
  }

function myMin(arr){
  return d3.min(arr, function(d){
    return d3.min(d.score)
  })
}

export function makeMatrix(data){
//after data
  //x.domain([0, data.length])

  c.domain([0, myMax(data)])

  let row = svg.selectAll(".row")
  .data(data, (d) =>{
    return d.name
  })

  row
    .exit()
  .transition()
    .duration(750)
    .style("fill-opacity", 1e-6)
    .remove()

  row
    .enter()
    .append('g')
    .attr('class', 'row')
    .style("fill-opacity", 1)
    .append('text')
    .attr('class', 'myText')


  row
    .attr('transform', function(d,i){
      return 'translate(100,' + i * 100 + ')'
    })
    .select('.myText')
    .text((d)=>{return d.name})
    // .attr('transform', function(d,i){
    //   return 'translate(-100, 0)'
    // })
    .attr('fill', 'red')
    .attr('dx', -100)


  let column = row.selectAll('.column')
  .data(function(d){return d.score})

  column
    .exit()
    .remove()

  column
    .enter()
    .append('rect')
    .attr('class', 'column')

  column
    .attr('x', function(d, i){
      return i * 100
    })
    .attr('width', 100)
    .attr('height', 100)
    .style('fill', function(d, i){
      console.log(c(d))
      return 'hsl(60, 80%,' + Math.floor(c(d)/3.00) +'%)'
      //return 'rgb(200, '+ Math.floor(c(d)) +',200)'
      //return 'hsl(' + Math.floor(c(d)) + ', 60%, 60%)'
    })

}


