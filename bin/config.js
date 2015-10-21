var fs = require('fs')
  , join = require('path').join;

fs.readdirSync('./../templates', function(err, stuffs){
  console.log('hello')
   stuffs.forEach(function(stuff){
      //console.log(fs.stat.isFile(stuff))
      console.log('hello')
      fs.state('./../templates' + stuff, function(err, stats){
        if (err) {
            console.log(err);
            return; // exit here since stats will be undefined
        }
        console.log(stats)
        if (stats.isFile()) {
            //calback(dir + "/" + file);
            console.log('it;s a file')
        }
        if (stats.isDirectory()) {
            //walk(file, calback);
            console.log('it;s a eirectory')
        }
      })
    })
 })

  // folders.forEach(function(folder){
  //   fs.mkdir('./../' + folder)
  //   fs.writeFile(file, data, function(err, wat){

  //   })
  // })
