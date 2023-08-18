import { BrowserRouter } from 'react-router-dom'
import { CompatRouter } from 'react-router-dom-v5-compat'
import React from 'react'
import ReactDOM from 'react-dom'

import App from '@components/App'

import '@css/app.css'

ReactDOM.render(
    <BrowserRouter>
        <CompatRouter>
            <App />
        </CompatRouter>
    </BrowserRouter>,
    document.getElementById('app'),
)
