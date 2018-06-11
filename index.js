const readline = require('readline')
const ansiRegex = require('ansi-regex')
const config = require('./.before-push.js')
const _package = require('./package.json')

const CMD = {
  interface: readline.createInterface({ input: process.stdin, output: process.stdout, historySize: 0 }),
  clearAll: () => { process.stdout.write('\u001b[H\u001b[J') },
  clear: line => readline.clearLine(process.stdout, 0, line),
  write: msg => { process.stdout.write(`${msg}\n`) }
}

let commit = {
  type : {},
  isRelease: {},
  version: _package.version.split('.'),
  message: {
    content: ''
  }
}

/* Main ========================================================================================= */
const main = () => {
  const promptManager = new PromptManager()
  promptManager.push(new SelectPrompt('What type of commit is this?', 'type', config.types))
  promptManager.push(new SelectPrompt('Is this a part of release?', 'isRelease', [{name: 'Yes'}, {name: 'No'}]))
  promptManager.push(new MessagePrompt('Write your commit message?', 'message.content'))

  promptManager.draw()

}

/* PromptManager ================================================================================= */
class PromptManager {
  constructor () {
    this.index = 0
    this.prompts = []
    this.data = ''
    CMD.clearAll()

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

    CMD.interface.input.setEncoding('ascii')

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
      process.stdout.clearLine()
      this.index++
      this.reset()
      this.draw()
    } else {
      process.stdin.unref()
      this.index = null

      commit.version[commit.type.level]++

      console.log(commit)

    }
  }
}

/**
 * Use the Scene class as a template to write prompts
 */
class Prompt {
  constructor (question, key) {
    this.index = 0
    this.question = question
    this.key = key
    this.data = ''
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

    commit = {
      ...commit,
      ...object
    }
  }
}

/* SelectPrompt ================================================================================= */
class SelectPrompt extends Prompt {
  constructor (question, key, items) {
    super(question, key)
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

      CMD.clearAll()
      this.draw()
      break
    case 'down':
      this.index = this.index + 1
      this.index = this.index % this.items.length

      CMD.clearAll()
      this.draw()
      break
    case 'return':
      this.process(this.items[this.index])
      this.next() // Assigned at PromptManager.push
      break
    default:
        // CMD.clearAll()
        // this.draw()
    }
  }

  draw () {
    CMD.write(this.question)

    this.items.map((type, key) => {
      if (key === this.index) {
        CMD.write(`● ${type.name}`)
      } else {
        CMD.write(`○ ${type.name}`)
      }
    })
  }
}

class MessagePrompt extends Prompt {
  constructor (question, key) {
    super(question, key)
    this.isRaw = false
  }

  handleData (chunk) {
    this.data += chunk.replace(ansiRegex(), '').replace(/\r/g, '')
  }

  handleKeypress (str, key) {
    switch (key.name) {
    case 'return':
      this.process(this.data)
      this.next() // Assigned at PromptManager.push
      break
    }
  }

  draw () {
    CMD.write(this.question)
    CMD.interface.prompt()
  }
}

/* Run ========================================================================================== */
main()