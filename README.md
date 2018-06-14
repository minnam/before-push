# before-push
Command line interface for semantic versioning node application

## TODO
- Export commits to CHANGELOG.md
- commitlog

## Configuring before-push
The configuration file can be found in `.before-push.js`.
The configuration settings are read from an object with
the properties `commitTypes` and `versionFormat`.
`commitTypes` is an array of objects which define what set of actions should be performed. `versionFormat` defines formatting in the changelog entries.

### Adding a commit type
New types of commits should be defined as objects in the `commitType` array. There are several valid properties you can assign to a commit object to define its behaviour. Properies marked with [OPTIONAL] are not required for the user-defined commit to be valid and if left out will result in the same behaviour as if the property was defined with a value of `false`. Optional properties may also have values of `null`, which are evaluated as `false`.

- name
  - Type: string 
  - Will be displayed when prompting for type selection.
- requireMessage [OPTIONAL]
  - Type: boolean
  - If true, will prompt the user to input a commit message.
- requireMessagePrefix [OPTIONAL]
  - Type: boolean
  - If true, will prompt the user to input text to be prepended to their commit message. Will default to `false` if `requireMessage` is `false`, `null` or `undefined`. 
- requireMessagePostfix [OPTIONAL]
  - Type: boolean
  - If true, will prompt the user to input text to be appended to their commit message. Will default to `false` if `requireMessage` is `false`, `null` or `undefined`.
- updateChangelog: [OPTIONAL]
  - Type: boolean
  - If true, will write commit messages to the changelog.
- includePrefix [OPTIONAL]
  - Type: boolean
  - If true, will include the commit message's prefix in the changelog entry. Will default to `false` if `updateChangelog` is `false`, `null` or `undefined`.
- includPostfix [OPTIONAL]
  - Type: boolean
  - If true, will include the commit message's postfix in the changelog entry. Will default to `false` if `updateChangelog` is `false`, `null` or `undefined`.
- addDate [OPTIONAL]
  - Type: boolean
  - If true, will add the date to the heading of the changelog entry. Will default to `false` if `updateChangelog` is `false`, `null` or `undefined`.