const CMD = require('./cmd')
const check = require('check-types')
const Color = require('./color')
const INPUT_BLACKLIST = require('./input-blacklist')

class Prompt {
  constructor (question, key, validations, done, commit) {
    this.index = 0
    this.question = question
    this.key = key
    this.validations = validations || []
    this.data = ''
    this.done = done
    this.commit = commit
    CMD.interface.setPrompt('')
    this.color = new Color()
  }

  prompt (error) {
    if (error) {
      CMD.clear(1)
    }

    CMD.write(`${this.question} ${this.color.red(error) || ''}`)
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

    if (this.done) {
      this.process(this.parseInput(this.data) || this.items[this.index])
      this.done(this.parseInput(this.data) || this.items[this.index], this.next)
    } else {
      this.next() // Assigned at PromptManager.push
    }
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

    if (!this.getData()) {
      this.setData({...object})
    } else {
      this.setData(this.merge(this.getData(), object, 0))
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

module.exports = Prompt