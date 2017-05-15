import React, { Component } from 'react'
import blessed from 'blessed'
import { render } from 'react-blessed'
import getJSON from 'get-json'

const stylesheet = {
  common: {
    mouse: true,
    keys: true,
    vi: true,
  },
  bordered: {
    border: {
      type: 'line',
    },
    style: {
      border: {
        fg: 'blue',
      },
    },
  },
  scrollable: {
    scrollable: true,
    scrollbar: {
      bg: 'green',
    },
  },
}
// Rendering a simple centered box
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
    }
  }
  componentDidMount() {
    getJSON('https://jsonplaceholder.typicode.com/users', (err, resp) => {
      debugger;
      this.setState({
        users: resp,
      })
    })
  }
  render() {
    return (
      <box>
        <list
          label="orders"
          width="30%"
          items={this.state.users.map(usr => usr.name)}
          focused={true}
          class={[
            stylesheet.common,
            stylesheet.bordered,
            stylesheet.scrollable,
          ]}
        />
      </box>
    )
  }
}

// Create a screen object.
var screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'jun shen blessed',
})

// Adding a way to quit the program
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0)
})

// Rendering the React app using our screen
const component = render(<App />, screen)
