import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Background from './Background'
import Footer from './Footer'
import Header from './Header'
import Welcome from './Welcome'

function App() {
    return (
        <div className="app">
            <Background />
            <Header />
            <Switch>
                <Route exact path="/" component={ Welcome } />
                <Route path="/home" component={ Welcome } />
            </Switch>
            <Footer />
        </div>
    )
}

export default App
