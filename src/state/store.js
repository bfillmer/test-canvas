
import {createStore, compose} from 'redux'

import {reducer} from 'state/reducers'
import {grid} from 'state/grid'

console.log(grid)

// Use Redux DevTools Extension if available and not in production.
const composeEnhancers = ((process.env.NODE_ENV !== 'production') && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

// If we aren't in production and we have redux devtools let's add that as middleware.
export const store = createStore(
  reducer,
  composeEnhancers()
)
