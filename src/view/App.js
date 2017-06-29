
import React from 'react'

import {Viewport} from 'view/Viewport'
import {Grid} from 'view/Grid'
import {Lines} from 'view/Lines'
import {Blocks} from 'view/Blocks'

export const App = () => (
  <Viewport>
    <Grid />
    <Lines />
    <Blocks />
  </Viewport>
)
