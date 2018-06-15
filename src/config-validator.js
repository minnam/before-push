const check = require('check-types')

const configTemplate = {
  defaultType: check.object,
  versionFormat: check.string,
  commitTypes: check.array,
}
const typeTemplate = {
  name: check.nonEmptyString,
  requireMessage: check.boolean,
  requireMessagePrefix: check.boolean,
  requireMessagePostfix: check.boolean,
  updateChangelog: check.boolean,
  includePrefix: check.boolean,
  includePostfix: check.boolean,
  addDate: check.boolean,
  addVersionNumbering: check.boolean,
  versionIndex: check.integer,
}

class ConfigValidator {
  // Checks the config object against the config template.
  checkConfig (config) {
    if(check.not.object(config)) {
      throw new TypeError('Invalid config type!\n'
      + `Expected type: object. Got type: <${typeof config}>.`)
    }
    const result = check.map(config, configTemplate)
    for(const key in result) {
      if(!result[key]) {
        throw new TypeError(
          'Error - Unexpected type\n'
          + `Property: ${key}\n`
          + `Type found: <${config[key]}>\n`)
      }
    }
    if(check.not.array.of.object(config.commitTypes)) {
      throw new TypeError('config.commitTypes should be an array of only objects.')
    }
  }

  // Checks a single commit type against the type template.
  checkType (type) {
    const result = check.map(type,typeTemplate)
    for(const key in result) {
      if(!result[key]) {
        throw new TypeError(
          'Error - Unexpected type\n'
          + `Commit name: ${type.name}\n`
          + `Property: ${key}\n`
          + `Type found: <${typeof type[key]}>\n`)
      }
    }
  }

  checkVersionFormat (format) {
    if(check.nonEmptyString(format)) {
      // TODO
    }
  }
}
// for(let i = 0; i < this.config.commitTypes.length; ++i) {
//  console.log(this.config.commitTypes[i].versionIndex, this.config.versionFormat.custom.split('#').length - 1)
//  if (!check.less(this.config.commitTypes[i].versionIndex, this.config.versionFormat.custom.split('#').length - 1)) {
//    throw new Error(`7 object at commitTypes[${i}] has incorrect version format`)
//  }
//   if(
//     !check.all(
//       check.map(
//         this.config.commitTypes[i],
//         typeTemplate
//       )
//     )
//   ) {
//     throw new Error('asdfsadf')
//   }
// }
module.exports = ConfigValidator