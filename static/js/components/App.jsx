import React from 'react'

import Background from './Background'
import Footer from './Footer'
import Header from './Header'
import Welcome from './Welcome'

function App() {
    return (
        <div className="app">
            <Background />
            <Header />
            <Welcome />
            <Footer />
        </div>
    )
}

export default App
