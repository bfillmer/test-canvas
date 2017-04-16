/* global test, expect */

import React from 'react'
import renderer from 'react-test-renderer'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import {reducer} from 'state/reducer'

import {App} from 'view/App'

// Import the expected "snapshot" of the redux store that describes
// our UI we wish to test.
import data from './initialState.json'

const testStore = createStore(
  reducer,
  JSON.parse(data.preloadedState)
)

test('loads initialState and renders', () => {
  const tree = renderer.create(
    <Provider store={testStore}>
      <App />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
