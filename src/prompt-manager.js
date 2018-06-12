const CMD = require('./cmd')

class PromptManager {
  constructor () {
    this.index = 0
    this.prompts = []
    this.data = null

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

  setData (data) {
    this.data = { ...data }
  }

  push (prompt) {
    prompt.next = this.next.bind(this)
    prompt.getData = () => this.data
    prompt.setData = this.setData.bind(this)
    this.prompts.push(prompt)
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
    }
  }
}

module.exports = PromptManager