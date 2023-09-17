import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'

import App from '@components/App'

import '@css/app.css'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app'),
)
