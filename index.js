const config = require('./.before-push.js')
const PromptManager = require('./src/prompt-manager')
const SelectPrompt = require('./src/select-prompt')
const MessagePrompt = require('./src/message-prompt')

const validations = {
  required: {
    callback: a => a === '' || a === undefined,
    message: 'required'
  }
}

/* Main ========================================================================================= */
const main = () => {
  const promptManager = new PromptManager()

  // (index, value, next) => {
  //   if (value == ) {
  //     if (config.commitTypes[value].requrieMessagePrefix) {
  //       next()
  //     } else {
  //       next(index + 2)
  //     }
  //   }
  // }

  // TODO:
  // add done callback param to Prompt Class (index, value, next) => {}
  // in proceed function, done (this.index, value???, this.next)

  promptManager.push(
    new SelectPrompt(
      {
        message: 'What kind of commit is this?',
        key: 'type',
        validations: null,
        done: null,
      },
      config.commitTypes
    )
  )
  promptManager.push(
    new SelectPrompt(
      {
        message: 'Is this a part of a release?',
        key: 'isRelease',
        validations: null,
        done: null,
      },
      [{name: 'Yes'}, {name: 'No'}]
    )
  )
  promptManager.push(
    new MessagePrompt(
      {
        message: 'Write your commit prefix:',
        key: 'message.prefix',
        validations: [validations.required],
        done: null,
      }
    )
  )
  promptManager.push(
    new MessagePrompt(
      {
        message: 'Write your commit message:',
        key: 'message.content',
        validations: [validations.required],
        done: null,
      }
    )
  )
  promptManager.draw()
}

/* Run ========================================================================================== */
main()