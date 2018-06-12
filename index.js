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

  promptManager.push(
    new SelectPrompt(
      {
        message: 'What kind of commit is this?',
        key: 'type',
        validations: null,
        done: (data, value, next) => {
          if(value.requireMessage) {
            if(value.requireMessagePrefix) {
              next(1)
            } else {
              next(2)
            }
          } else {
            next(4)
          }
        },
      },
      config.commitTypes
    )
  )
  // promptManager.push(
  //   new SelectPrompt(
  //     {
  //       message: 'Is this a part of a release?',
  //       key: 'isRelease',
  //       validations: null,
  //       done: null
  //     },
  //     [{name: 'Yes'}, {name: 'No'}]
  //   )
  // )
  promptManager.push(
    new MessagePrompt(
      {
        message: 'Write your commit prefix:',
        key: 'message.prefix',
        validations: [validations.required],
        done: null
      }
    )
  )
  promptManager.push(
    new MessagePrompt(
      {
        message: 'Write your commit message:',
        key: 'message.content',
        validations: [validations.required],
        done: (data, value, next) => {
          if(data.type.requireMessagePostfix) {
            next(1)
          } else {
            next(2)
          }
        },
      }
    )
  )
  promptManager.push(
    new MessagePrompt(
      {
        message: 'Write your commit postfix:',
        key: 'message.hello',
        validations: [validations.required],
        done: null,
      }
    )
  )
  promptManager.draw()

  promptManager.done((data) => {
    console.log('done --------------------------')
    console.log(data)
  })
}

/* Run ========================================================================================== */
main()