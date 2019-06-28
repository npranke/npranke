import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Background from './Background'
import Footer from './Footer'
import Header from './Header'
import PageNotFound from './PageNotFound'
import Welcome from './Welcome'
import Workbook from './Workbook'
import WorksheetContainer from './WorksheetContainer'
import worksheets from '../constants/worksheets'

function App() {
    const { concentration } = worksheets

    return (
        <div className="app">
            <Background />
            <Switch>
                <Route
                    exact
                    strict
                    path={ [
                        '/',
                        '/home',
                        '/workbook',
                        '/workbook/concentration',
                    ] }
                    component={ Header }
                />
                <Route
                    render={ (props) => {
                        return <Header { ...props } isPageNotFound />
                    } }
                />
            </Switch>
            <Switch>
                <Route
                    exact
                    strict
                    path={ ['/', '/home'] }
                    component={ Welcome }
                />
                <Route
                    exact
                    strict
                    path="/workbook"
                    component={ Workbook }
                />
                <Route
                    exact
                    strict
                    path="/workbook/concentration"
                    render={ (props) => {
                        return (
                            <WorksheetContainer
                                { ...props }
                                worksheet={ concentration }
                            />
                        )
                    } }
                />
                <Route component={ PageNotFound } />
            </Switch>
            <Footer />
        </div>
    )
}

export default App
