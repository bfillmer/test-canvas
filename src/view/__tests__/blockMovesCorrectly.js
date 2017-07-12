/* global test, expect */

// @TODO Generalize this whole test file so we can create new tests that use new json data, and a
// test description.
import React from 'react'
import renderer from 'react-test-renderer'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import {reducer} from 'state/reducers'

import {App} from 'view/App'

const testStore = createStore(reducer)

// Actions that got us to the expected UI visual.
import data from './moveBlockActions.json'
const actionsArray = JSON.parse(data.payload)

console.log(actionsArray)

// Replay the actions in order to end up with our needed state for our
// expected UI visual.
actionsArray.map(testStore.dispatch)

test('canvas loads and a block is moved', () => {
  const tree = renderer.create(
    <Provider store={testStore}>
      <App />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
