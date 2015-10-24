var fs = require('fs')
  , join = require('path').join

var des = process.argv[2] || '../../..'

var cur = process.cwd()

var root = join(__dirname, '../templates')

function copyPaste(dir){

  var names = fs.readdirSync(dir)

  names.forEach(function(name){
    
    if(name === 'node_modules') return

    var stats = fs.statSync(join(dir, name))
      
    var newDir =  join(cur, des, dir.replace(root, ''))

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
}

copyPaste(root)