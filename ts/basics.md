## Intro
- TS = JS with Type Checking
- Medium to Large Project: TS
- Simple Project: JS

## Drawbacks
- compilation
- discipline in coding

## Transpilation
- Compile and convert into JS.
- `tsc code.ts`
  - compile and this will result `code.js`
  - by default, each code in TS will convert into ES5 (JS)
- To fix default compilation (JS) target
  - `tsc --init` => tsconfig.json => update **target** => (CTRL + space) => To get valid options.
  - rootDir, outDir, removeComments, noEmitOnError (don't generate JS if there are errors)

  ## Debugging
  - Inside `tsconfig.json` => sourceMap
  - Run & Debug (vs code) => launch.json => "preLaunchTask": "tsc "; => Launch Program