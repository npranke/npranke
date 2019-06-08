import React from 'react'

import GitHub from '../../img/icon-github.png'
import Home from '../../img/icon-home.png'
import LinkedIn from '../../img/icon-linkedin.png'
import Workbook from '../../img/icon-workbook.png'
import { getSendEventHandler, getWorkbookClickHandler } from '../utils'

function Header() {
    return (
        <nav className="header" role="navigation">
            <div className="left-header">
                <div className="icon-container icon-container-home">
                    <a
                        onClick={ getSendEventHandler(
                            'header',
                            'navigate',
                            'home',
                        ) }
                        href="/home"
                        target="_self"
                        rel="noreferrer"
                        title="Home"
                        aria-label="Home"
                    >
                        <img
                            src={ Home }
                            className="icon icon-home"
                            alt="Home icon"
                        />
                    </a>
                </div>
            </div>
            <div className="right-header">
                <div className="icon-container icon-container-workbook">
                    <a
                        onClick={ getWorkbookClickHandler('header') }
                        href="/"
                        target="_self"
                        rel="noreferrer"
                        title="Workbook"
                        aria-label="Workbook"
                    >
                        <img
                            src={ Workbook }
                            className="icon icon-workbook"
                            alt="Workbook icon"
                        />
                    </a>
                </div>
                <div className="icon-container icon-container-github">
                    <a
                        onClick={ getSendEventHandler(
                            'header',
                            'navigate',
                            'github',
                        ) }
                        href="https://github.com/npranke"
                        target="_blank"
                        rel="noreferrer noopener"
                        title="GitHub"
                        aria-label="GitHub"
                    >
                        <img
                            src={ GitHub }
                            className="icon icon-github"
                            alt="GitHub icon"
                        />
                    </a>
                </div>
                <div className="icon-container icon-container-linkedin">
                    <a
                        onClick={ getSendEventHandler(
                            'header',
                            'navigate',
                            'linkedin',
                        ) }
                        href="https://www.linkedin.com/in/npranke"
                        target="_blank"
                        rel="noreferrer noopener"
                        title="LinkedIn"
                        aria-label="LinkedIn"
                    >
                        <img
                            src={ LinkedIn }
                            className="icon icon-linkedin"
                            alt="LinkedIn icon"
                        />
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Header
