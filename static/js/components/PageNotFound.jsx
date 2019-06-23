import React from 'react'

import { getLocationPageTitle, getSendEventHandler } from '../utils'
import Home from '../../img/icon-home.png'

function PageNotFound() {
    document.title = getLocationPageTitle('pagenotfound')

    return (
        <main className="pagenotfound">
            <div className="intro">
                Oops! <br />
                Page not found.
            </div>
            <div className="button-home">
                <a
                    onClick={ getSendEventHandler(
                        'pagenotfound',
                        'navigate',
                        'home',
                    ) }
                    href="/home"
                    target="_self"
                    rel="noreferrer"
                >
                    <img
                        src={ Home }
                        className="icon icon-home"
                        alt="Home icon"
                    />
                    <span className="text-home">Home</span>
                </a>
            </div>
        </main>
    )
}

export default PageNotFound