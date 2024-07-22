import { Component, onMount } from 'solid-js'
import { Route, Router } from '@solidjs/router'
import { MetaProvider } from '@solidjs/meta'

import Pages from './pages'

const App: Component = () => {

  return (
    <MetaProvider>
      <Router>
        <Route path='/:lang'>
          <Pages />
        </Route>
        <Pages />
      </Router>
    </MetaProvider>
  )
}

export default App