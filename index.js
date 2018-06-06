const readline = require('readline')
const package = require('./package.json')

const TYPES = [
  {
    name: 'phase',
    level: 0,
    postfix: '',
  },
  {
    name: 'feat',
    level: 1,
    postfix: ''
  },
  {
    name: 'fix',
    level: 2,
    postfix: '',
  },
  {
    name: 'docs',
    level: 2,
    postfix: '',
  },
  {
    name: 'style',
    level: 2,
    postfix: '',
  },
  {
    name: 'refactor',
    level: 2,
    postfix: '',
  },
  {
    name: 'test',
    level: 2,
    postfix: '',
  },
  {
    name: 'chore',
    level: 2,
    postfix: '',
  }
]

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

let index = 0 
let scene = 0
let commit = {}

flag = false

function clear (n) {
  for (let i = 0; i < n; i++) {
    process.stdout.write('\033[1A')
  }  
}

function draw () {
  TYPES.map((type, key) => {
    if (key === index) {      
      readline.clearLine(process.stdout, 0, key)
      process.stdout.write(`> ${type.name}\n`);
    } else {
      readline.clearLine(process.stdout, 0, key)
      process.stdout.write(` ${type.name}\n`);
    }
  }) 
}

function nextScene () {
  console.log(commit)
  scene++
}


process.stdout.write(`What kind of commit is it?\n`);
draw()

process.stdin.on('keypress', (str, key) => {  
  if (scene == 0) {
    switch (key.name) {
      case 'up':
        if (index - 1 === -1) {
          index = TYPES.length - 1
        } else {
          index = index - 1
        }
        clear(TYPES.length)
        draw()
      break
      case 'down':
        index = index + 1
        index = index % TYPES.length 
        clear(TYPES.length)
        draw()
      break        
      case 'return':    
        commit = { 
          ...TYPES[index]
        }
        nextScene()
      
      break
    }  
  } else if (scene == 1) {
    rl.on('line', (line) => {
      console.log(`Received: ${line}`);
    });
    nextScene()
    // rl.question('What do you think of Node.js? ', (answer) => {
    //   // TODO: Log the answer in a database
    //   console.log(`Thank you for your valuable feedback: ${answer}`);
    
    //   rl.close();
    // });
    // nextScene()
  }
  
})


// const prompt = require('prompt')
// const colors = require('colors/safe')
// const { exec } = require( 'child_process' )
// const package = require('./package.json')

// //
// // Start the prompt
// //
// prompt.message = ''
// // prompt.start()


// async function ls() {
//   // const { stdout, stderr } = await exec('ls')
  
//   // console.log('stderr:', stderr)
// }
// //
// // Get two properties from the user: username and email
// //
// prompt.get({
//   properties: {
//     commitType: {
//       pattern: /(phase)|(feat)|(fix)|(docs)|(style)|(refactor)|(test)|(chore)/,
//       message: 'Must be one of feat, fix, docs, style, refactor, test, or chore',
//       description: colors.magenta('What type of commit is this? (feat, fix, docs, style, refactor, test, chore)')
//     }
//   }
// }, (err, result) => {
//   const v = package.version.split('.')
 
//   switch (result.commitType) {
//     case 'phase':
//       v[0]++
//       v[1] = 0
//       v[2] = 0
//       break 

//     case 'feat':
//       v[1]++
//       break
//     case 'fix':        
//       v[2]++
//       break
//     case 'chore':
//     case 'docs':
//     case 'refactor':
//     case 'style':
//     case 'test':
//   }

//   console.log( `${v[0]}.${v[1]}.${v[2]}` )
//   console.log(prompt.history())
//   // exec('dir', (err, stdout, stderr) => {
//   //   console.log('hello', err, stdout, stderr)
//   // })
// })