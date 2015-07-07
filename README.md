# cmd-liner
Node.js library to help build awesome command line tools.

## Installation

```bash
$ npm install cmd-liner
```

## Features

  * Hierarchical (nested) commands.
  * Easily provide documentation for every one of the commands.
  * Handle errors when you want to.

## Quick Start

```JavaScript
var cmdliner = require('cmd-liner');
```

Now you need to create your commands object.

```JavaScript
var commands = {};
commands.say = { action: function() { console.log('Hi !'); } };
commands.this = {
  commands: {
    is: function(optimist) {
      console.log('I can use optimist to parse arguments');
    }
  },
  nohandler: function() { console.error('No handler for this command :(')); }
}
```

Then you can initialize the command liner.
```JavaScript
cmdliner.init(commands);
```

Take a look at https://github.com/substack/node-optimist. Every 'action' will be called with the instance of 'optimist' so you can parse arguments and create aliases. If your requirement needs no such thing, don't worry about it.

## To-Do
[ ] Allow non-dashed parameters. (like 'echo <something>')
[ ] Code example and more documentation
