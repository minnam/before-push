const check = require('check-types')
const typeTemplate = {
  name: check.nonEmptyString,
  requireMessage: check.boolean,
  requireMessagePrefix: check.boolean,
  requireMessagePostfix: check.boolean,
  updateChangelog: check.boolean,
  omitPrefix: check.boolean,
  omitPostfix: check.boolean,
  addDate: check.boolean,
  addVersionNumbering: check.boolean,
  versionIndex: check.integer,
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
      // Check if each object in the commitTypes array has the correct number of properties.
      for(let i = 0; i < this.config.commitTypes.length; ++i) {
        // console.log(this.config.commitTypes[i].versionIndex, this.config.versionFormat.custom.split('#').length - 1)
        if(check.not.hasLength(Object.keys(this.config.commitTypes[i]), 10)) {

          throw new Error(`7 object at commitTypes[${i}] has incorrect number of properties.`)
        } else {
          // console.log(this.config.commitTypes[i].versionIndex, this.config.versionFormat.custom.split('#').length - 1)
          if (!check.less(this.config.commitTypes[i].versionIndex, this.config.versionFormat.custom.split('#').length - 1)) {
            throw new Error(`7 object at commitTypes[${i}] has incorrect version format`)
          }
        }
        if(
          !check.all(
            check.map(
              this.config.commitTypes[i],
              typeTemplate
            )
          )
        ) {
          throw new Error('asdfsadf')
        }
      }
    } catch (err) {
      throw err
    }
  }
}

module.exports = ConfigValidator