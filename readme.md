> Remove flow types from js files and produce them as patternplate side effect

# patternplate-transform-flow-remove-types

## Installation

```shell
npm install --save-dev patternplate-transform-flow-remove-types
```

## Usage

```js
// configuration/patternplate-server/tasks.js
module.exports = {
  'build-commonjs': {
    out: './lib',
    filters: {
      inFormats: ['js'],
      baseNames: ['index']
    },
    patterns: {
      formats: {
        js: {
          name: 'patterns',
          importStatement: localName => `import '${localName}';`, // eslint-disable-line flow-check/check
          transforms: ['babel', 'resolve-imports', 'flow-remove-types']
        }
      }
    },
    transforms: {
      'flow-remove-types': {
        inFormat: 'js',
        outFormat: 'js'
      },
      'resolve-imports': {
        inFormat: 'js',
        outFormat: 'js',
        resolve: '%(outputName)s/%(patternId)s/index.%(extension)s'
      }
    }
  }
};

```


---
Built by (c) Mario Nebl. Released under the [MIT license]('./license.md').
