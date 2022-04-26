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

  2- Add the desired Alias to `exports` array in `package.json` file

  ```js
      "exports": {
          // other exports ...
          "StyledCommonCss": "./dist/src/lib/constant/StyledCommonCss.js",
      }
  ```

  Now, your module/file can be used like `import {myStyle} from '@cliqmind/rv-components/StyledCommonCss'`
