# react-vexflow

> React components for VexFlow

[![NPM](https://img.shields.io/npm/v/react-vexflow.svg)](https://www.npmjs.com/package/react-vexflow) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-vexflow
```

## Usage

```jsx
import React from 'react'

import { Score } from 'react-vexflow'

function Example() {
  return (
    <Score
      staves={[
        ['g3', 'd4', 'e4', 'd4'],
        ['a4', 'd4', 'e4', 'd4'],
        ['a4', 'a4', 'b4', 'a4'],
        ['d4', 'e4', ['g3', 2]],
      ]}
    />
  )
}
```

## License

MIT © [markacola](https://github.com/markacola)
