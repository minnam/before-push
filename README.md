# before-push
Command line interface for semantic versioning node application

## TODO
- Export commits to CHANGELOG.md

commitlog

## Configuring before-push
The configuration file can be found in `.before-push.js`.
`config` has the following properties:
- defaultType
- versionFormat
- commitTypes

The `defaultType` property is the template from which user-defined commit types inherit their values for any properties that are left `undefined` or `null`.

The `versionFormat` string defines how the version numbering will be formatted in the changelog
entries.

The `commitTypes` array holds objects representing user-defined commit types.

### Adding a commit type
New types of commits should be defined as objects in the `commitType` array. There are several valid properties you can assign to a commit object to define its behaviour. These properties are as follows:
- `name` < string > **Default:** `'default commit'`
- `requireMessage` < boolean > **Default:** `true`
- `requireMessagePrefix` < boolean > **Default:** `false`
  - Will be treated as `false`, regardless of value if `requireMessage` is `false` or `undefined`.
- `requrieMessagePostFix` < boolean > **Default:** `false`
  - Will be treated as `false`, regardless of value if `requireMessage` is `false` or `undefined`.
- `updateChangelog` < boolean > **Default:** `true`
- `includePrefix` < boolean > **Default:** `false`
  - Will be treated as `false`, regardless of value if `updateChangelog` is `false` or `undefined`.
- `includePostfix` < boolean > **Default:** `false`
  - Will be treated as `false`, regardless of value if `updateChangelog` is `false` or `undefined`.
- `addDate` < boolean > **Default:** `false`
  - Will be treated as `false`, regardless of value if `updateChangelog` is `false` or `undefined`.
- `addVersionNumbering` < boolean > **Default:** `false`
  - Will be treated as `false`, regardless of value if `updateChangelog` is `false` or `undefined`.
- `versionIndex` < integer > **Default:** `0`

If properties are left out of an object definition the are assigned their default value.