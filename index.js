const readline = require('readline')
const config = require('./.before-push.js')
const package = require('./package.json')

const CMD = {
  clearAll: () => { process.stdout.write('\u001b[2J\u001b[0;0H') },
  clear: line => readline.clearLine(process.stdout, 0, line),
  write: msg => { process.stdout.write(`${msg}\n`); }
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
  readline.createInterface({ input: process.stdin, output: process.stdout, })
  
  const sceneManager = new SceneManager()
  sceneManager.push(new TypePrompt())
  sceneManager.draw()

}

/* SceneManager ================================================================================= */
class SceneManager {
  constructor () {
    this.index = 0
    this.scenes = []

    CMD.clearAll()
  }  

  push (scene) {
    scene.next = this.next.bind(this)
    this.scenes.push(scene)
  }

  draw () {
    this.scenes[this.index].draw()
    process.stdin.on('keypress', (str, key) => {
      this.scenes[this.index].handleKeypress(key.name)
    })
  }

  next () {
    if (this.index + 1 < this.scenes.length) {
      this.index++
    } else {
      CMD.clearAll()
      process.stdout.write('done');
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

  draw () {}
  handleKeypress () {}
  next () {}
}

/* TypePrompt ====================================================================================*/
class TypePrompt extends Scene {
  constructor () {
    super(null)
  }

  handleKeypress (stroke) {
    switch (stroke) {
      case 'up':
        if (this.index - 1 === -1) {
          this.index = config.types.length - 1
        } else {
          this.index = this.index - 1
        }

        CMD.clearAll(config.types.length)
        this.draw()
      break
      case 'down':
        this.index = this.index + 1
        this.index = this.index % config.types.length

        CMD.clearAll(config.types.length)
        this.draw()
      break
      case 'return':
        this.next() // Assigned at SceneManager.push
      break
    }
  }

  draw () {
    CMD.write(`What kind of commit is it?`)
    
    config.types.map((type, key) => {
      if (key === this.index) {
        CMD.clear(key)
        CMD.write(`> ${type.name}`)
      } else {
        CMD.clear(key)
        CMD.write(` ${type.name}`)
      }
    })
  }
}

/* Run ========================================================================================== */
main()