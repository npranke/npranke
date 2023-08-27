import { Link } from 'react-router-dom'

import Workbook from '@img/icon-workbook.png'

import {
    getLocationPageTitle,
    getSendEventHandler,
    sendPageview,
} from '@utils'

function Welcome() {
    document.title = getLocationPageTitle('home')

    sendPageview()

    return (
        <main className="welcome">
            <div className="intro">
                Welcome! <br />
                My name is Nicole; I&#8217;m a software engineer.
            </div>
            <div className="button-workbook">
                <Link
                    onClick={ getSendEventHandler(
                        'welcome',
                        'navigate',
                        'workbook',
                    ) }
                    to="/workbook"
                    target="_self"
                    rel="noreferrer"
                >
                    <img
                        src={ Workbook }
                        className="icon icon-workbook"
                        alt="Workbook icon"
                    />
                    <span className="text-workbook">Workbook</span>
                </Link>
            </div>
        </main>
    )
}

export default Welcome
