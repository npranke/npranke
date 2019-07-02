import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Background from '@components/Background'
import Footer from '@components/Footer'
import Header from '@components/Header'
import PageNotFound from '@components/PageNotFound'
import Welcome from '@components/Welcome'
import Workbook from '@components/Workbook'
import WorksheetContainer from '@components/WorksheetContainer'

import worksheets from '@constants/worksheets'

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
