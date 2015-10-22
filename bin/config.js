var fs = require('fs')
  , join = require('path').join

var root = './../templates'

function copyPaste(dir){

  var names = fs.readdirSync(dir)

  //console.log(names)

  names.forEach(function(name){
    
    if(name === 'node_modules') return
    
    fs.stat(join(dir, name), function(err, stats){
      if (err) {
        console.log(err);
        return; 
      }
      
      if (stats.isFile()) {

        var contents = fs.readFileSync(join(dir, name), 'utf-8')     
        fs.writeFileSync(join(dir.replace(root, './..'), name), contents, 'utf-8')
        
      }
      if (stats.isDirectory()) {

        fs.mkdirSync(join(dir.replace(root, './..'), name))
        if(name !== 'build') copyPaste(join(dir, name))
      }
    })
  

  })
}

copyPaste(root)