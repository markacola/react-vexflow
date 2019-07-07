import React, { Component } from 'react'
import { Score } from 'react-vexflow'

export default class App extends Component {
  render() {
    return (
      <div>
        <Score
          staves={[
            ['g3', 'd4', 'e4', 'd4'],
            ['a4', 'd4', 'e4', 'd4'],
            ['a4', 'a4', 'b4', 'a4'],
            ['d4', 'e4', ['g3', 2]],
          ]}
        />
      </div>
    )
  }
}
