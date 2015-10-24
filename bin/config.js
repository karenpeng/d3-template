var fs = require('fs')
  , join = require('path').join

var root = './../templates'

function copyPaste(dir){

  var names = fs.readdirSync(dir)

  names.forEach(function(name){
    
    if(name === 'node_modules') return
    
    fs.stat(join(dir, name), function(err, stats){
      if (err) {
        console.log(err);
        return; 
      }
      
      var newDir =  dir.replace(/templates\/*/, '')
      if (stats.isFile()) {

        var contents = fs.readFileSync(join(dir, name), 'utf-8')     
        fs.writeFileSync(join(newDir, name), contents, 'utf-8')

      }
      if (stats.isDirectory()) {

        fs.mkdirSync(join(newDir, name))
        if(name === 'build') return
        copyPaste(join(dir, name))
      }
    })

  })
}

copyPaste(root)

fs.rmdir(root)