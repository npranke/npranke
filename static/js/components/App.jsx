import { CompatRoute } from 'react-router-dom-v5-compat'
import React from 'react'
import { Switch } from 'react-router-dom'

import Background from '@components/Background'
import Footer from '@components/Footer'
import Header from '@components/Header'
import PageNotFound from '@components/PageNotFound'
import Welcome from '@components/Welcome'
import Workbook from '@components/Workbook'
import WorksheetContainer from '@components/WorksheetContainer'

import worksheets from '@constants/worksheets'

function App() {
    const { CONCENTRATION, TOWER } = worksheets

    return (
        <div className="app">
            <Background />
            <Switch>
                <CompatRoute
                    exact
                    strict
                    path="/"
                    component={ Header }
                />
                <CompatRoute
                    exact
                    strict
                    path="/home"
                    component={ Header }
                />
                <CompatRoute
                    exact
                    strict
                    path="/workbook"
                    component={ Header }
                />
                <CompatRoute
                    exact
                    strict
                    path="/workbook/concentration"
                    component={ Header }
                />
                <CompatRoute
                    exact
                    strict
                    path="/workbook/tower"
                    component={ Header }
                />
                <CompatRoute
                    exact
                    path="*"
                    render={ (props) => {
                        return <Header { ...props } isPageNotFound />
                    } }
                />
            </Switch>
            <Switch>
                <CompatRoute
                    exact
                    strict
                    path="/"
                    component={ Welcome }
                />
                <CompatRoute
                    exact
                    strict
                    path="/home"
                    component={ Welcome }
                />
                <CompatRoute
                    exact
                    strict
                    path="/workbook"
                    component={ Workbook }
                />
                <CompatRoute
                    exact
                    strict
                    path="/workbook/concentration"
                    render={ (props) => {
                        return (
                            <WorksheetContainer
                                { ...props }
                                worksheet={ CONCENTRATION }
                            />
                        )
                    } }
                />
                <CompatRoute
                    exact
                    strict
                    path="/workbook/tower"
                    render={ (props) => {
                        return (
                            <WorksheetContainer
                                { ...props }
                                worksheet={ TOWER }
                            />
                        )
                    } }
                />
                <CompatRoute exact path="*" component={ PageNotFound } />
            </Switch>
            <Footer />
        </div>
    )
}

export default App
