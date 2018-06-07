const readline = require('readline')
const config = require('./.before-push.js')
const package = require('./package.json')

const CMD = {
  clearAll: () => { process.stdout.write('\u001b[H\u001b[J') },
  clear: line => readline.clearLine(process.stdout, 0, line),
  write: msg => { process.stdout.write(`${msg}\n`); },
  read: () => { readline.createInterface({ input: process.stdin, output: process.stdout, }) },
}

const commit = {
  type : {},
  version: [],
  message: {
    prefix: '',
    content: '',
    postfix: ''
  }
}

/* Main ========================================================================================= */
const main = () => {  
  const sceneManager = new SceneManager()
  sceneManager.push(new TypePrompt())
  
  // if (config.message) {
  //   if (config.message.prefix) {
  //     sceneManager.push(new MessagePrompt('Write prefix for your commit message'))
  //   }
  // }
  sceneManager.push(new MessagePrompt('Write your commit message', 'message.prefix'))
  sceneManager.push(new MessagePrompt('ab'))
  
  sceneManager.draw()

}

r1 = readline.createInterface({ input: process.stdin, output: process.stdout, })

/* SceneManager ================================================================================= */
class SceneManager {  
  constructor () {
    this.index = 0
    this.scenes = []
    this.data = ''
    this.stdin = process.openStdin();
    CMD.clearAll()

    this.handleData =  (data) => {
      if (this.index !== null && this.scenes[this.index].handleData) {                
        this.scenes[this.index].handleData(data)        
      }
    }

    this.handleKeypress = (str, key) => {
      if (this.index !== null && this.scenes[this.index].handleKeypress) {
        this.scenes[this.index].handleKeypress(str, key)
      }
    }

  }  

  push (scene) {
    scene.next = this.next.bind(this)
    this.scenes.push(scene)
  }

  draw () {  
    if (this.scenes[this.index].draw) {
      this.scenes[this.index].draw()
    }      
    
    

    process.stdin.resume()
    process.stdin.setEncoding("ascii")
    
    this.stdin.addListener('data', this.handleData)

    this.stdin.addListener('end', () => {
      if (this.index !== null && this.scenes[this.index].handleEnd) {                
        this.scenes[this.index].handleEnd(data)        
      }
    })

    this.stdin.addListener('keypress', this.handleKeypress)   
   
  }

  reset () {
    this.data = ''
    this.stdin.removeListener('data', this.handleData)
    this.stdin.removeListener('keypress', this.handleKeypress)

    this.handleData =  (data) => {
      if (this.index !== null && this.scenes[this.index].handleData) {                
        this.scenes[this.index].handleData(data)        
      }
    }

    this.handleKeypress = (str, key) => {
      if (this.index !== null && this.scenes[this.index].handleKeypress) {
        this.scenes[this.index].handleKeypress(str, key)
      }
    }
  }

  next () {
    this.reset()
    // CMD.clearAll()
    if (this.index + 1 < this.scenes.length) {      
      this.index++
      this.reset()
      this.draw()      
    } else {                        
      console.log(commitis.index)
      process.stdin.unref()
      this.index = null      
    }
  }
}

/**
 * Use the Scene class as a template to write prompts
 */
class Scene {
  constructor () {
    this.index = 0
  }
}

/* TypePrompt ====================================================================================*/
class TypePrompt extends Scene {
  constructor () {
    super(null)
  }

  handleKeypress (str, key) {    
    switch (key.name) {
      case 'up':
        if (this.index - 1 === -1) {
          this.index = config.types.length - 1
        } else {
          this.index = this.index - 1
        }

        // CMD.clearAll(config.types.length)
        CMD.clearAll()
        this.draw()
      break
      case 'down':
        this.index = this.index + 1
        this.index = this.index % config.types.length

        // CMD.clearAll(config.types.length)
        CMD.clearAll()
        this.draw()
      break
      case 'return':
        commit.type = config.types[this.index]
        this.next() // Assigned at SceneManager.push
      break
      default:
        CMD.clearAll(config.types.length)
        this.draw()
    }
  }

  draw () {
    CMD.write(`What kind of commit is it?`)
    
    config.types.map((type, key) => {
      if (key === this.index) {
        // CMD.clear(key)
        CMD.write(`> ${type.name}`)
      } else {
        // CMD.clear(key)
        CMD.write(` ${type.name}`)
      }
    })
  }
}

class MessagePrompt extends Scene {
  constructor (message) {
    super(null)
    this.question = `${message}\n`
  }

  handleData (chunk) {        
    this.data += chunk
  }

  handleKeypress (str, key) {
    switch (key.name) {
      case 'return':
        commit.message = this.data
        this.next() // Assigned at SceneManager.push
      break
      default:
        // this.draw()
    }
  }

  handleEnd () {
    this.next()
  }

  draw () {
    CMD.write(this.question)
    CMD.write(this.data)
  }
}

/* Run ========================================================================================== */
main()