
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import 'tachyons'

import {App} from 'view/App'

import {store} from 'state/store'

const Container = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<Container />, document.getElementById('root'))
