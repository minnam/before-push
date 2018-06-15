const config = {
  commitTypes: [
    {
      name: 'Phase',

      requireMessage: true, // boolean   
      // Specifies whether a commit message is required or not.

      requireMessagePrefix: true, // boolean  
      // Determines if the commit message should have prefixed text.

      requireMessagePostfix: true, //boolean
      // Determines if the commit message should have appended text.

      updateChangelog: true, // boolean
      // Determines if the changelog should be updated when running a commit of this type.

      omitPrefix: true, // boolean
      // Specifies if the prefix should be omitted from the changelog entry.
      
      omitPostfix: true, // boolean
      // Specifies if the postfix should be omitted from the changelog entry.
      
      addDate: true, // boolean
      // Determines if the changelog entry should be formatted with a date.

      addVersionNumbering: true, // boolean           
      // Determines if the changelog entry should be formatted with a version number.

      versionIndex: 0, // integer
      // Specifies which digit (index) of the changelog's version numbering to increment.
    },
    {
      name: 'Feature',
      requireMessage: true, // boolean   
      // Specifies whether a commit message is required or not.

      requireMessagePrefix: true, // boolean  
      // Determines if the commit message should have prefixed text.

      requireMessagePostfix: true, //boolean
      // Determines if the commit message should have appended text.

      updateChangelog: true, // boolean
      // Determines if the changelog should be updated when running a commit of this type.

      omitPrefix: true, // boolean
      // Specifies if the prefix should be omitted from the changelog entry.
      
      omitPostfix: true, // boolean
      // Specifies if the postfix should be omitted from the changelog entry.
      
      addDate: true, // boolean
      // Determines if the changelog entry should be formatted with a date.

      addVersionNumbering: true, // boolean           
      // Determines if the changelog entry should be formatted with a version number.

      versionIndex: 0, // integer
      // Specifies which digit (index) of the changelog's version numbering to increment.
    },
    {
      name: 'Fix',
      requireMessage: true, // boolean   
      // Specifies whether a commit message is required or not.

      requireMessagePrefix: true, // boolean  
      // Determines if the commit message should have prefixed text.

      requireMessagePostfix: false, //boolean
      // Determines if the commit message should have appended text.

      updateChangelog: true, // boolean
      // Determines if the changelog should be updated when running a commit of this type.

      omitPrefix: true, // boolean
      // Specifies if the prefix should be omitted from the changelog entry.
      
      omitPostfix: true, // boolean
      // Specifies if the postfix should be omitted from the changelog entry.
      
      addDate: true, // boolean
      // Determines if the changelog entry should be formatted with a date.

      addVersionNumbering: true, // boolean           
      // Determines if the changelog entry should be formatted with a version number.

      versionIndex: 0, // integer
      // Specifies which digit (index) of the changelog's version numbering to increment.
    },
    {
      name: 'Docs',
      requireMessage: false, // boolean   
      // Specifies whether a commit message is required or not.

      requireMessagePrefix: true, // boolean  
      // Determines if the commit message should have prefixed text.

      requireMessagePostfix: true, //boolean
      // Determines if the commit message should have appended text.

      updateChangelog: true, // boolean
      // Determines if the changelog should be updated when running a commit of this type.

      omitPrefix: true, // boolean
      // Specifies if the prefix should be omitted from the changelog entry.
      
      omitPostfix: true, // boolean
      // Specifies if the postfix should be omitted from the changelog entry.
      
      addDate: true, // boolean
      // Determines if the changelog entry should be formatted with a date.

      addVersionNumbering: true, // boolean           
      // Determines if the changelog entry should be formatted with a version number.

      versionIndex: 0, // integer
      // Specifies which digit (index) of the changelog's version numbering to increment.
    },
    {
      name: 'Style',
      requireMessage: true, // boolean   
      // Specifies whether a commit message is required or not.

      requireMessagePrefix: true, // boolean  
      // Determines if the commit message should have prefixed text.

      requireMessagePostfix: true, //boolean
      // Determines if the commit message should have appended text.

      updateChangelog: true, // boolean
      // Determines if the changelog should be updated when running a commit of this type.

      omitPrefix: true, // boolean
      // Specifies if the prefix should be omitted from the changelog entry.
      
      omitPostfix: true, // boolean
      // Specifies if the postfix should be omitted from the changelog entry.
      
      addDate: true, // boolean
      // Determines if the changelog entry should be formatted with a date.

      addVersionNumbering: true, // boolean           
      // Determines if the changelog entry should be formatted with a version number.

      versionIndex: 0, // integer
      // Specifies which digit (index) of the changelog's version numbering to increment.
    },
    {
      name: 'Refactor',
      requireMessage: true, // boolean   
      // Specifies whether a commit message is required or not.

      requireMessagePrefix: true, // boolean  
      // Determines if the commit message should have prefixed text.

      requireMessagePostfix: false, //boolean
      // Determines if the commit message should have appended text.

      updateChangelog: true, // boolean
      // Determines if the changelog should be updated when running a commit of this type.

      omitPrefix: true, // boolean
      // Specifies if the prefix should be omitted from the changelog entry.
      
      omitPostfix: true, // boolean
      // Specifies if the postfix should be omitted from the changelog entry.
      
      addDate: true, // boolean
      // Determines if the changelog entry should be formatted with a date.

      addVersionNumbering: true, // boolean           
      // Determines if the changelog entry should be formatted with a version number.

      versionIndex: 0, // integer
      // Specifies which digit (index) of the changelog's version numbering to increment.
    },
    {
      name: 'Test',
      requireMessage: true, // boolean   
      // Specifies whether a commit message is required or not.

      requireMessagePrefix: false, // boolean  
      // Determines if the commit message should have prefixed text.

      requireMessagePostfix: false, //boolean
      // Determines if the commit message should have appended text.

      updateChangelog: true, // boolean
      // Determines if the changelog should be updated when running a commit of this type.

      omitPrefix: true, // boolean
      // Specifies if the prefix should be omitted from the changelog entry.
      
      omitPostfix: true, // boolean
      // Specifies if the postfix should be omitted from the changelog entry.
      
      addDate: true, // boolean
      // Determines if the changelog entry should be formatted with a date.

      addVersionNumbering: true, // boolean           
      // Determines if the changelog entry should be formatted with a version number.

      versionIndex: 0, // integer
      // Specifies which digit (index) of the changelog's version numbering to increment.
    },
    {
      name: 'Chore',
      requireMessage: false, // boolean   
      // Specifies whether a commit message is required or not.

      requireMessagePrefix: true, // boolean  
      // Determines if the commit message should have prefixed text.

      requireMessagePostfix: true, //boolean
      // Determines if the commit message should have appended text.

      updateChangelog: true, // boolean
      // Determines if the changelog should be updated when running a commit of this type.

      omitPrefix: true, // boolean
      // Specifies if the prefix should be omitted from the changelog entry.
      
      omitPostfix: true, // boolean
      // Specifies if the postfix should be omitted from the changelog entry.
      
      addDate: true, // boolean
      // Determines if the changelog entry should be formatted with a date.

      addVersionNumbering: true, // boolean           
      // Determines if the changelog entry should be formatted with a version number.

      versionIndex: 0, // integer
      // Specifies which digit (index) of the changelog's version numbering to increment.
    }
  ],
  versionFormat: '#.#.#' // string
}

module.exports = config