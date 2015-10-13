import {data} from './../../../data/data.js'
import {data1} from './../../../data/data1.js'
//import {makeBar} from './bar.js'
// import {makeLine} from './line.js'
// import {makeSatterPlot} from './scatterplot.js'
// import {makePie} from './charts/pie.js'
import {matrix} from './../../../data/matrix.js'
import {makeMatrix} from './matrix.js'

import {makeBoss} from './boss.js'

function Factory(func, data){
  let index = -1

  this.next = function(){
    if(index + 1 > data.length - 1){
      index = 0
    }else{
      index ++
    }
    func(data[index])
  }
}

//var barFactory = new Factory(makeBar, data)
var matrixFactory = new Factory(makeMatrix, matrix)

document.getElementById('btn').onclick = function(){
  //barFactory.next()
  matrixFactory.next()
}

makeBoss('./../../../data/boss.csv')

// makeLine('./../../....//data/data.csv')
// makePie('./../../../../data/data1.csv')
// makeSatterPlot(data1)



