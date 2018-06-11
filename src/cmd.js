const readline = require('readline')

const CMD = {
  interface: readline.createInterface({ input: process.stdin, output: process.stdout, historySize: 0 }),
  clearOffset: 2,
  clear: line => {
    // for (let i = 0; i < line; i++) {
    //   readline.cursorTo(process.stdout, 0, -1)
    //   readline.clearLine(process.stdout, 0)
    // }

    readline.cursorTo(process.stdout, 0, process.stdout.rows - line - CMD.clearOffset)
    // readline.clearScreenDown()
  },
  write: msg => { process.stdout.write(`${msg}\n`) }
}

module.exports = CMD