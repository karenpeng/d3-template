import d3 from 'd3'
import {makeScatterPlot} from './charts/scatterplot.js'

d3.csv('../../data/data.csv', (err, data) => {
  makeScatterPlot(data)
})