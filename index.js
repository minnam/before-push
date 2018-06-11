const PromptManager = require('./src/prompt-manager')
const config = require('./.before-push.js')
const SelectPrompt = require('./src/select-prompt')
const MessagePrompt = require('./src/message-prompt')

const validations = {
  required: {
    callback: a => a === '' || a === undefined,
    message: 'required'
  }
}

let commit
// version: package.version.split('.'),

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

  // 1:  ({question: '????', key, validations, done}, {items})
  // 2: add done callback param to Prompt Class (index, value, next) => {}
  //           -- in proceed function, done (this.index, value???, this.next)
  //

  promptManager.push(
    new SelectPrompt(
      'What type of commit is this?',
      'type',
      null,
      config.commitTypes
    ), commit)
  promptManager.push(new SelectPrompt('Is this a part of release?', 'isRelease', null, [{name: 'Yes'}, {name: 'No'}]), commit)
  promptManager.push(
    new MessagePrompt(
      'Write your commit prefix',
      'message.prefix',
      [validations.required],
      null,
    ))
  promptManager.push(
    new MessagePrompt(
      'Write your commit message',
      'message.content',
      [validations.required]
    )
  )

  promptManager.draw()

}

/* Run ========================================================================================== */
main()