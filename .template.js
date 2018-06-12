const configTemplate = {
    // Each object in the commiType array will be represented as a choice when the script inintially prompts
    // for a type of commit.
    commitType: [
        {
            name: 'name', // string           
            // The name of the commit type that is displayed in the commit type propmt.

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
        }
    ],
    versionFormat: {
        useCustomVersion: false, // boolean
        // Specifies if the version numbering displayed in the changelog should follow default numbering
        // or the format specified in the 'custom' property.
        
        custom: '#.#.#' // string
        // Defines a custom template for the changlog numbering.
        // Digits are placed in the string at the locations designated by the '#' character.
        // Examples:
        // A version number like: 1.12.5 would use a format like: #.#.#
        // A version number like: 0-1-6.1 would use a format like: #-#-#.# 
    },
    dateFormat: 'yyyy-mm-dd',
}
