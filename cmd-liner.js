var cmd = require('optimist')       // Parsing command line arguments.
var colors = require('colors');     // Pretty colors

exports.init = function(commands, options, action) {
  
  options = options || { };
  action = action || function() { console.log(cmd.help()) }
  
  var argv = cmd.argv;
  
  if(argv._.length < 1) {
    action(argv);
    return;
  }
  
  var currentCommand = {action: action, desc: null, commands: commands};
  for(var i = 0; i < argv._.length; i++) {
    
    var currentHandler = argv._[i];

    if(currentCommand.commands[currentHandler]) {
      
      if(i == argv._.length-1){
        currentCommand.commands[currentHandler].action(argv);
        break;
      } else {
        currentCommand = currentCommand.commands[currentHandler];
        continue;
      }
    }
    
    currentCommand.nohandler = currentCommand.nohandler || function () {
      console.log("ERROR:".inverse + " Could not find handler for " + currentHandler); process.exit(1); 
    }
    
    currentCommand.nohandler(argv);
    break;
    
  }
  
}