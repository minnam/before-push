const config = {
  /**
   * defaultType
   * The template from which user-defined commit types inherit their
   * values from for any properties that are left undeclared/undefined/null.
   * 
   * DO NOT RENAME OR REMOVE ANY OF THIS OBJECT'S PROPERTIES.
   * 
   * You may edit the values of the properties below if you would like to change what
   * undefined properties in user-created commitTypes default to. However, it is safer to
   * explicitly define the given properties for your commit types when adding them to the 
   * commitTypes array.
   */
  defaultType: {
    // <string> 
    // The text that will be displayed in the commit type selection list.
    name: 'default commit',
    // <boolean> 
    // Specifies whether a commit message is required or not.
    requireMessage: true,
    // <boolean>
    // Determines if the commit message should have prefixed text.
    requireMessagePrefix: false,  
    // <boolean> 
    // Determines if the commit message should have appended text.
    requireMessagePostfix: false,
    // <boolean> 
    // Determines if the changelog should be updated when running a commit of this type.
    updateChangelog: true,
    // <boolean> 
    // Specifies if the prefix should be omitted from the changelog entry.
    includePrefix: false,
    // <boolean> 
    // Specifies if the postfix should be omitted from the changelog entry.
    includePostfix: false,
    // <boolean> 
    // Determines if the changelog entry should be formatted with a date.
    addDate: false,
    // <boolean> 
    // Determines if the changelog entry should be formatted with a version number.
    addVersionNumbering: false,
    // <int> 
    // Specifies which digit (index) of the changelog's version numbering to increment.
    versionIndex: 0,
  },
  /**
   * versionFormat 
   * Defines how the version numbering will be formatted in the changelog
   * entries. If left as an empty string, the default format will be <#.#.#> where
   * # are replaced by the digits of the version number. i.e. 1.0.4
   * 
   * To define a string use the <#> symbol to designate where the digits of the
   * version number should be placed.
   */
  versionFormat: '',
  /**
   * commitTypes
   * This array holds objects representing user-defined commit types. To create your own
   * custom type, create an object in the array using the defaultCommitType as a template.
   * If properties are left out, they are replaced by the corresponding property from
   * defaultCommitType.
   */
  commitTypes: [
    {
      name: 'Phase',
      requireMessagePrefix: true,
      includePrefix:true,
      addDate: true,
      addVersionNumbering: true,
    },
    {
      name: 'Feat',
      requireMessagePrefix: true,
      includePrefix: true,
      addDate: true,
      addVersionNumbering: true,
      versionIndex: 1,
    },
    {
      name: 'Fix',
      addVersionNumbering: true,
      addDate: true,
      versionIndex: 2,
    },
    {
      name: 'Docs',
      updateChangelog: false,
    },
    {
      name: 'Style',
      requireMessage: false,
      updateChangelog: false,
    },
    {
      name: 'Refactor',
      addDate: true,
      addVersionNumbering: true,
      versionIndex: 2,
    },
    {
      name: 'Test',
      requireMessagePrefix: false,
      updateChangelog: false,
    },
    {
      name: 'Chore',
      requireMessage: false,
      updateChangelog: false,
    },
  ]
}

module.exports = config