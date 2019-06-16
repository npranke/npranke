import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Background from './Background'
import Footer from './Footer'
import Header from './Header'
import PageNotFound from './PageNotFound'
import Welcome from './Welcome'
import Workbook from './Workbook'

function App() {
    return (
        <div className="app">
            <Background />
            <Switch>
                <Route
                    exact
                    path={ ['/', '/home', '/workbook'] }
                    component={ Header }
                />
                <Route
                    render={
                        (props) => {
                            return <Header { ...props } isPageNotFound />
                        }
                    }
                />
            </Switch>
            <Switch>
                <Route exact path={ ['/', '/home'] } component={ Welcome } />
                <Route exact path="/workbook" component={ Workbook } />
                <Route component={ PageNotFound } />
            </Switch>
            <Footer />
        </div>
    )
}

export default App
