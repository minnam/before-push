// const fs              = require('fs')
const config          = require('./.before-push.js')
const ConfigValidator = require('./src/config-validator')
const PromptManager   = require('./src/prompt-manager')
const SelectPrompt    = require('./src/select-prompt')
const MessagePrompt   = require('./src/message-prompt')

const validations = {
  required: {
    callback: a => a === '' || a === undefined,
    message: 'required'
  }
}

/* Main ========================================================================================= */
const main = () => {

  const childProcess = require('child_process')

  const git = childProcess.exec('git add .', function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack)
      console.log('Error code: '+error.code)
      console.log('Signal received: '+error.signal)
    }
    console.log('Child Process STDOUT: '+stdout)
    console.log('Child Process STDERR: '+stderr)
  })

  git.on('exit', function (code) {
    console.log('Child process exited with exit code '+code)
  })

  const args = process.argv.slice(2)

  switch (args[0]) {
  case 'init':
    // perform initialization actions
    break
  default:
    // print usage information
  }

  try {
    const cfgValidator = new ConfigValidator(config)
    cfgValidator.checkConfig()

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
          key: 'message.postfix',
          validations: [validations.required],
          done: null,
        }
      )
    )

    promptManager.draw()

    promptManager.done((data) => {
      console.log('--- done ---')
      let entry = ''
      if(data.type.updateChangelog) {
        entry = data.type.name
        if(!data.type.omitPrefix) {
          entry += `: ${data.message.prefix} `
        }
        entry += data.message.content
        if(!data.type.omitPostfix) {
          entry += ' ' + data.message.postfix
        }
      }
      console.log(entry)
    })

    // const fakelog = '## [#.#.#] - yyyy/mm/dd\n'
    //   + '- change 1\n'
    //   + '- change 2\n'

    // fs.open('testlog.md', 'a', (err, fd) => {
    //   if(err) {
    //     throw err
    //   }
    //   console.log('testlog.md opened')
    //   fs.write(fd, fakelog, 0, 'utf8', (err, written, string) => {
    //     if(err) {
    //       throw err
    //     }
    //     console.log('writing to testlog.md . . .')
    //     fs.close(fd, (err) => {
    //       if(err) {
    //         throw err
    //       }
    //       console.log('testlog.md closed')
    //     })
    //   })
    // })
  } catch (err) {
    console.log(err.message)
  }
}
/* Run ========================================================================================== */
main()