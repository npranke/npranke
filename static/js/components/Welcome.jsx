import React from 'react'

import Workbook from '../../img/icon-workbook.png'
import { getWorkbookClickHandler } from '../utils'

function Welcome() {
    return (
        <div className="welcome" role="main">
            <div className="intro">
                Welcome! <br />
                My name is Nicole; I&#8217;m a software engineer.
            </div>
            <div className="button-workbook">
                <a
                    onClick={ getWorkbookClickHandler('welcome') }
                    href="/"
                    target="_self"
                    rel="noreferrer"
                    title="Workbook"
                >
                    <img
                        src={ Workbook }
                        className="icon icon-workbook"
                        alt="Workbook icon"
                    />
                    <span className="text-workbook">Workbook</span>
                </a>
            </div>
        </div>
    )
}

export default Welcome
