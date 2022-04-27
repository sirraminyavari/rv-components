# RV-COMPONENTS

This is where @cliqmind's global react components will lie...

## Installation

Install rv-components via npm

```bash
  npm install @cliqmind/rv-components --save
```

## Documentation

**important notes**:

- The packaging process only effects the imported modules in `/src/lib/index.ts` file and can be accessed via direct import of the package (e.g. `import {myComponent} from '@cliqmind/rv-components'`)
- **Non-Imported** modules will be treeshaked!

* Create a global scoped component

  1- Create your desired component/utility inside `src/lib/` ()

  2- Export the component/utility from `src/lib/index.ts`

  - Create a Sub-Module/Alias
    If you desire to create a sub-module or a static alias for a file,

  1- Add the **file** or the entry point of the **sub-module** to the `input` array in `rollupOptions` located in `vite.config.ts` file to prevent module to accidentally get **tree-shaked**.

  ```ts
      export default defineConfig({
          plugins: [ ... ],
          build: {
              rollupOptions: {
              input: [
                  //other inputs...
                  path.resolve(__dirname, "src/lib/constant/StyledCommonCss.ts"),
              ],
              // other configurations ...
              },
          },
      });
  ```

  2- Add the the folders/files to `files` array in `package.json` file (Only the listed files/folders in `files` key in `package.json` file will be composed as npm package)

  ```js
      "files": [
          // other package files ...
          // file/folder path has to be relative to `src/lib`
          "./constant/StyledCommonCss.js",
      ]
  ```

  Now, your module/file can be used like `import {myStyle} from '@cliqmind/rv-components/constant/StyledCommonCss'`

## Build CI

- All commits to the **Main** branch of the repository, triggers the **publish** workflow and bumps the version of the package in npm registry, except commits with `docs-only` text included in their message.

### workflow steps

- Check for the latest version number published to npm.

- Lookup all commits between the git commit that triggered the action and the latest publish.

  - If the package hasn't been published or the prior publish does not include a git hash, we'll only pull the commit data that triggered the action.

- Based on the commit messages, increment the version from the lastest release.

  - If the string "BREAKING CHANGE" is found anywhere in any of the commit messages or descriptions the major version will be incremented.

  - If a commit message begins with the string "feat" then the minor version will be increased. This works for most common commit metadata for feature additions: "feat: new API" and "feature: new API".

  - All other changes will increment the patch version.

- Publish to npm using the configured token.

- Push a tag for the new version to GitHub.

for more information regarding the workflow, please visit the [mikeal/merge-release](https://github.com/mikeal/merge-release#workflow) repo
