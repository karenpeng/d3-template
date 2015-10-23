import d3 from 'd3'
import {makeScatterPlot} from './charts/scatterPlot.js'

d3.csv('../../data/data.csv', (err, csv) =>{
  console.log(csv)
})