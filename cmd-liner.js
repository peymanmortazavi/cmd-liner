var cmd = require('optimist')       // Parsing command line arguments.
var colors = require('colors');     // Pretty colors

exports.init = function(commands, options, action) {
  
  cmd.usage(generateUsage(commands));
  
  options = options || { };
  action = action || function() { console.log(cmd.help()) }
  
  var argv = cmd.argv;
  
  if(argv._.length < 1) {
    action(cmd);
    return;
  }
  
  var currentCommand = {action: action, desc: null, commands: commands};
  for(var i = 0; i < argv._.length; i++) {
    
    var currentHandler = argv._[i];

    if(currentCommand.commands && currentCommand.commands[currentHandler]) {
      
      if(i == argv._.length-1){
        currentCommand.commands[currentHandler].action = 
          currentCommand.commands[currentHandler].action || function(){console.log(cmd.help());}
        currentCommand.commands[currentHandler].action(cmd);
        break;
      } else {
        currentCommand = currentCommand.commands[currentHandler];
        cmd.usage(generateUsage(currentCommand.commands));
        continue;
      }
    }
    
    currentCommand.nohandler = currentCommand.nohandler || function () {
      console.log("ERROR:".inverse + " Could not find handler for " + currentHandler); process.exit(1); 
    }
    
    currentCommand.nohandler(cmd);
    break;
    
  }
  
}

function generateUsage(commands) {
  
  var usage = "Usage: $0 [COMMAND]\n\nAvailable Commands:";
  
  for(var commandName in commands) {
    usage += '\n   '+commandName + '\t\t'+(commands[commandName].desc || '');
  }
  
  return usage;
  
}