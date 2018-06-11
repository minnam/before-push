const readline = require('readline')
const check = require('check-types');
var getCursorPosition = require('get-cursor-position');
const config = require('./.before-push.js')
const package = require('./package.json')


const CMD = {
  interface: readline.createInterface({ input: process.stdin, output: process.stdout, historySize: 0}),
  clearOffset: 2,
  clear: line => {    
    // for (let i = 0; i < line; i++) {
    //   readline.cursorTo(process.stdout, 0, -1)
    //   readline.clearLine(process.stdout, 0)
    // }    
    
    readline.cursorTo(process.stdout, 0, process.stdout.rows - line - CMD.clearOffset)    
    // readline.clearScreenDown()
  },
  write: msg => { process.stdout.write(`${msg}\n`); }
}

const validations = {
  required: {
    callback: a => a === '' || a === undefined,
    message: 'required'
  }
}

let commit = null
  // version: package.version.split('.'),


/* Main ========================================================================================= */
const main = () => {  
  const promptManager = new PromptManager()
  promptManager.push(new SelectPrompt('What type of commit is this?', 'type', null, config.types))
  promptManager.push(new SelectPrompt('Is this a part of release?', 'isRelease', null, [{name: 'Yes'}, {name: 'No'}]))
  promptManager.push(
    new MessagePrompt(
      'Write your commit prefix', 
      'message.prefix',
      [validations.required]
    ))
  // promptManager.push(
  //   new MessagePrompt(
  //     'Write your commit message', 
  //     'message.content',
  //     [validations.required]
  //   )
  // )

  promptManager.draw()
  
}

/* PromptManager ================================================================================= */
class PromptManager {  
  constructor () {
    this.index = 0
    this.prompts = []
    this.data = ''

    this.handleData =  (data) => {
      if (this.index !== null && this.prompts[this.index].handleData) {                
        this.prompts[this.index].handleData(data)        
      }
    }

    this.handleKeypress = (str, key) => {
      if (this.index !== null && this.prompts[this.index].handleKeypress) {
        this.prompts[this.index].handleKeypress(str, key)
      }
    }

  }  

  push (scene) {
    scene.next = this.next.bind(this)
    this.prompts.push(scene)
  }

  draw () {  
    if (this.prompts[this.index].draw) {
      this.prompts[this.index].draw()
    }      
    
    CMD.interface.input.setEncoding("ascii")
    
    CMD.interface.input.addListener('data', this.handleData)
    CMD.interface.input.addListener('keypress', this.handleKeypress)   
  }

  reset () {
    this.data = ''
    CMD.interface.input.removeListener('data', this.handleData)
    CMD.interface.input.removeListener('keypress', this.handleKeypress)

    this.handleData =  (data) => {
      if (this.index !== null && this.prompts[this.index].handleData) {
        this.prompts[this.index].handleData(data)
      }
    }

    this.handleKeypress = (str, key) => {
      if (this.index !== null && this.prompts[this.index].handleKeypress) {
        this.prompts[this.index].handleKeypress(str, key)
      }
    }
  }

  next () {
    this.reset()
    if (this.index + 1 < this.prompts.length) {
      process.stdout.clearLine();
      this.index++
      this.reset()
      this.draw()
    } else {                        
      process.stdin.unref()
      this.index = null
      
      // commit.version[commit.type.level]++

      console.log(commit)

    }
  }
}

/**
 * Use the Scene class as a template to write prompts
 */
const INPUT_BLACKLIST =  [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))',
  '\r',
  '\n',
  '\t'
].join('|')

const COLORS = {
  white: '\x1B[37m',
  grey: '\x1B[90m',
  black: '\x1B[30m',
  blue: '\x1B[34m',
  cyan: '\x1B[36m',
  green: '\x1B[32m',
  magenta: '\x1B[35m',
  red: '\x1B[31m',
  yellow: '\x1B[33m'
}

class Color {
  constructor (defaultColor) {
    // Need to handle error
    this.defaultColor = COLORS[defaultColor] || COLORS.white

    for (const key in COLORS) {
      this[key] = (text) => {
        if (text) {
          return `${COLORS[key]}${text}${this.defaultColor}`
        }
      }
    }
  }
}

const color = new Color ()

class Prompt {  
  constructor (question, key, validations) {
    this.index = 0
    this.question = question
    this.key = key
    this.validations = validations || []
    this.data = ''

    CMD.interface.setPrompt('')
  }
  
  prompt (error) {
    if (error) {
      CMD.clear(1)
    }
  
    CMD.write(`${this.question} ${color.red(error) || ''}`)
    CMD.interface.prompt()
  }

  proceed () {    
    // console.log(this.data.length)
    let i = 0
    while (i < this.validations.length) {
      if (this.validations[i].callback(this.data)) {
        this.prompt(this.validations[i].message)
        return
      }
      i++
    }    

    this.process(this.parseInput(this.data))
    this.next() // Assigned at PromptManager.push
  }

  process (data) {
    const parsedKey = this.key.split('.')
    let i = parsedKey.length - 1
    let object = null

    while(i > -1) {      
      if (!object) {
        object = {}
        object[parsedKey[i]] = data
      } else {
        const temp = {...object}
        object = {}        
        object[parsedKey[i]] = {
          ...temp
        }        
      }
      i--
    }

    if (!commit) {
      commit = {...object}
    } else {
      commit = this.merge(commit, object, 0)
    }        
  }

  writeNewLine () {
    CMD.write('')
  }

  merge (obj1, obj2, index) {
    // console.log(index, '--------------------------------------')
    let mergedObject = {}
    Object.keys(obj1).map(key => {      
      if (obj2[key]) {
        if (check.object(obj1[key])) {          
          mergedObject[key] = this.merge(obj1[key], obj2[key], key)
        }
      } else {
        mergedObject = {
          ...obj1,
          ...obj2
        }          
      }
    })
    return mergedObject
  }

  parseInput (input) {    
    
    return input.replace(new RegExp(INPUT_BLACKLIST, 'g'), '')
  }
}

/* SelectPrompt ====================================================================================*/
class SelectPrompt extends Prompt {
  constructor (question, key, validations, items) {
    super(question, key, validations)
    this.isRaw = true
    this.items = items
  }

  handleKeypress (str, key) {    
    switch (key.name) {
      case 'up':
        if (this.index - 1 === -1) {
          this.index = this.items.length - 1
        } else {
          this.index = this.index - 1
        }

        CMD.clear(this.items.length)
        this.draw()
      break
      case 'down':
        this.index = this.index + 1
        this.index = this.index % this.items.length

        CMD.clear(this.items.length)
        this.draw()
      break
      case 'return':
        this.proceed()
      break
      default:
        // CMD.clearAll()
        // this.draw()
    }
  }

  draw () {
    this.prompt()
    
    this.items.map((type, key) => {
      if (key === this.index) {
        CMD.write(`${color.cyan('●')} ${type.name}`)
      } else {
        CMD.write(`${color.cyan('○')} ${type.name}`)
      }
    })
  }
}

class MessagePrompt extends Prompt {
  constructor (question, key, validations) {    
    super(question, key, validations)
    this.isRaw = false
    this.cursor = 0
    this.cursorFlag = false
  }

  handleData (input) {            
    switch (input) {
      case "\b":
        if (!this.cursorFlag) {
          this.data = this.data.substring(0, this.data.length - 1)        
        } else {
          const first = this.data.slice(0, this.cursor)
          const second = this.data.slice(this.cursor + 1, this.data.length)

          this.data = first + second
          this.cursorFlag = false
        }
      break
      case "\u001b[D":
        this.cursor--
        this.cursorFlag = true
      break
      case "\u001b[C":
        this.cursor++
        this.cursorFlag = true
      break
      case '\r':
      break
      default:
        
        if (!this.cursorFlag) {
          this.data += input
          this.cursor = this.data.length - 1
        } else {
          const first = this.data.slice(0, this.cursor + 1)
          const second = this.data.slice(this.cursor + 1, this.data.length)

          this.data = first + input + second
          this.cursorFlag = false
        }
    }
  }

  handleKeypress (str, key) {
    switch (key.name) {
      case 'return':                
        this.proceed()
      break
    }
  }

  draw () {
    this.writeNewLine()
    this.prompt()    
  }
}

/* Run ========================================================================================== */
main()