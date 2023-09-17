import { NavLink } from 'react-router-dom'

import GitHub from '@img/icon-github.png'
import Home from '@img/icon-home.png'
import LinkedIn from '@img/icon-linkedin.png'
import Workbook from '@img/icon-workbook.png'

import { getSendEventHandler } from '@utils'

function Header() {
    const homeLink = (
        <NavLink
            end
            onClick={ getSendEventHandler(
                'header',
                'navigate',
                'home',
            ) }
            to="/home"
            target="_self"
            rel="noreferrer"
            className="navlink navlink-home"
            title="Home"
            aria-label="Home"
        >
            <img src={ Home } className="icon icon-home" alt="Home icon" />
        </NavLink>
    )

    const workbookLink = (
        <NavLink
            onClick={ getSendEventHandler(
                'header',
                'navigate',
                'workbook',
            ) }
            to="/workbook"
            target="_self"
            rel="noreferrer"
            className="navlink navlink-workbook"
            title="Workbook"
            aria-label="Workbook"
        >
            <img
                src={ Workbook }
                className="icon icon-workbook"
                alt="Workbook icon"
            />
        </NavLink>
    )

    return (
        <nav className="header">
            <div className="left-header">
                <div className="icon-container icon-container-home">
                    { homeLink }
                </div>
            </div>
            <div className="right-header">
                <div className="icon-container icon-container-workbook">
                    { workbookLink }
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
                        rel="noreferrer noopener external"
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
                        rel="noreferrer noopener external"
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
