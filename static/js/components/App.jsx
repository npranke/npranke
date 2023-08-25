import { Route, Routes } from 'react-router-dom'
import React from 'react'

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
            <Header />
            <Routes>
                <Route path="" element={ <Welcome /> } />
                <Route path="home" element={ <Welcome /> } />
                <Route path="workbook" element={ <Workbook /> } />
                <Route
                    path="workbook/concentration"
                    element={
                        <WorksheetContainer worksheet={ CONCENTRATION } />
                    }
                />
                <Route
                    path="workbook/tower"
                    element={ <WorksheetContainer worksheet={ TOWER } /> }
                />
                <Route path="*" element={ <PageNotFound /> } />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
