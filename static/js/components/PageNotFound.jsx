import React from 'react'

import Home from '../../img/icon-home.png'
import { getLocationPageTitle, getSendEventHandler } from '../utils'

function PageNotFound() {
    document.title = getLocationPageTitle('pagenotfound')

    return (
        <div className="pagenotfound" role="main">
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
        </div>
    )
}

export default PageNotFound
