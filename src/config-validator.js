const check = require('check-types')
const typeTemplate = {
  name: check.nonEmptyString,
  requireMessage: check.maybe.boolean,
  requireMessagePrefix: check.maybe.boolean,
  requireMessagePostfix: check.maybe.boolean,
  updateChangelog: check.maybe.boolean,
  omitPrefix: check.maybe.boolean,
  omitPostfix: check.maybe.boolean,
  addDate: check.maybe.boolean,
  addVersionNumbering: check.maybe.boolean,
  versionIndex: check.maybe.integer,
}

class ConfigValidator {
  constructor (config) {
    this.config = config
  }

  checkConfig () {
    try {
      // Check if config is defined.
      if(check.undefined(this.config)) {
        throw new ReferenceError('0 config is undefined.')
      }
      // Check is config is an object.
      if(check.not.object(this.config)) {
        throw new TypeError('1 Invalid config type! Config should be of type object.')
      }
      // Check if config is not empty.
      if(check.emptyObject(this.config)) {
        throw new Error('2 Invalid config. No values found in config.')
      }
      // Check if config.commitTypes is defined.
      if(check.undefined(this.config.commitTypes)) {
        throw new ReferenceError('3 config.commitTypes not found.')
      }
      // Check if config.commitTypes is an array.
      if(check.not.array(this.config.commitTypes)) {
        throw new TypeError('4 Invalid list of commit types! ')
      }
      // Check if config.commitTypes is not empty.
      if(check.emptyArray(this.config.commitTypes)) {
        throw new Error(`5 config.commitTypes is invalid. 
          The commitType array should not be empty.`)
      }
      // Check if the commitTypes array contains only objects.
      if(check.not.array.of.object(this.config.commitTypes)) {
        throw new TypeError('6 config.commitTypes should be an array of only objects.')
      }
      // Check each object's properties against the template object.
      for(let i = 0; i < this.config.commitTypes.length; ++i) {
        const result = check.map(
          this.config.commitTypes[i],
          typeTemplate
        )
        for(const key in result) {
          if(!result[key]) {
            throw new TypeError(
              `7 Incorrect property type in ${this.config.commitTypes[i].name}: ${key}`)
          }
        }
      }
      // Check if config.versionFormat is defined.
      if(check.undefined(this.config.versionFormat)) {
        throw new ReferenceError('8 config.versionFormat is undefined.')
      }
      // Check if config.versionFormat is an object.
      if(check.not.object(this.config.versionFormat)) {
        throw new TypeError('9 Invalid type for config.versionFormat. Should be of type object.')
      }
    } catch (err) {
      throw err
    }
  }
}

// console.log(check.maybe.boolean(this.config.commitTypes[0].requireMessage))

// // Check if each object in the commitTypes array has the correct number of properties.
// for(let i = 0; i < this.config.commitTypes.length; ++i) {
//  // console.log(this.config.commitTypes[i].versionIndex, this.config.versionFormat.custom.split('#').length - 1)
//  // console.log(this.config.commitTypes[i].versionIndex, this.config.versionFormat.custom.split('#').length - 1)
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