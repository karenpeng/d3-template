var fs = require('fs')
  , join = require('path').join;

var names = fs.readdirSync('./../templates')

names.forEach(function(name){
  fs.stat(join('./../templates',  name), function(err, stats){
    if (err) {
        console.log(err);
        return; 
    }
    
    if (stats.isFile()) {

        var contents = fs.readFileSync(join('./', name))
        console.log(contents)
        //fs.writeFileSync(join('./', name), contents)
    }
    if (stats.isDirectory()) {
        //walk(file, calback);
        //console.log('it;s a eirectory ', name)
        //fs.mkdirSync(join('./' , name), 'utf-8')
    }
  })
})