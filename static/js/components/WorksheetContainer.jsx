import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

import Code from '@img/icon-code.png'
import Info from '@img/icon-info.png'

import { getLocationPageTitle, sendEvent, sendPageview } from '@utils'

function WorksheetContainer(props) {
    const [visible, setVisible] = useState('worksheet')
    const [, setFocus] = useState()

    const location = useLocation()

    useEffect(() => {
        document.title = getLocationPageTitle(props.worksheet.title)
    }, [])

    useEffect(() => {
        sendPageview()

        if (location.hash === '#info') {
            setVisible('info')
        } else if (location.hash === '#gist') {
            setVisible('gist')
        } else {
            setVisible('worksheet')
        }
    }, [location.hash])

    const infoPanel = useRef(null)
    const worksheetPanel = useRef(null)
    const gistPanel = useRef(null)

    const infoTab = useRef(null)
    const worksheetTab = useRef(null)
    const gistTab = useRef(null)

    const headerClickHandler = (event) => {
        const { section } = event.currentTarget.dataset

        sendEvent(`${props.worksheet.title}`, 'navigate', section)

        setVisible(section)
    }

    const headerKeyUpHandler = (event) => {
        const { section } = event.currentTarget.dataset

        if (event.key === 'Enter' || event.key === ' ') {
            setVisible(section)
            setFocus(() => {
                if (visible === 'info') {
                    infoPanel.current.focus()
                } else if (visible === 'gist') {
                    gistPanel.current.focus()
                } else {
                    worksheetPanel.current.focus()
                }
            })
        } else if (event.key === 'ArrowRight') {
            if (section === 'info') {
                worksheetTab.current.focus()
            } else if (section === 'worksheet') {
                gistTab.current.focus()
            }
        } else if (event.key === 'ArrowLeft') {
            if (section === 'gist') {
                worksheetTab.current.focus()
            } else if (section === 'worksheet') {
                infoTab.current.focus()
            }
        }
    }

    const infoSection = (
        <div
            className="worksheet-section info-wrapper"
            id="info-tabpanel"
            role="tabpanel"
            tabIndex="0"
            ref={ infoPanel }
        >
            <div className="worksheet-info">
                <div className="worksheet-info-inner">
                    { props.worksheet.infoComponent }
                </div>
            </div>
        </div>
    )

    const worksheetSection = (
        <div
            className={
                'worksheet-section worksheet-wrapper '
                + `${props.worksheet.pathTitle}-wrapper`
            }
            id="worksheet-tabpanel"
            role="tabpanel"
            tabIndex="0"
            ref={ worksheetPanel }
        >
            { props.worksheet.component }
        </div>
    )

    const gistSection = (
        <div
            className="worksheet-section gist-wrapper"
            id="gist-tabpanel"
            role="tabpanel"
            tabIndex="0"
            ref={ gistPanel }
        >
            <iframe
                id="worksheet-gist"
                title={ `${props.worksheet.properTitle} gist` }
                sandbox="allow-scripts allow-top-navigation"
                referrerPolicy="no-referrer"
                src={ `/gists/${props.worksheet.pathTitle}` }
            >
            </iframe>
        </div>
    )

    const sections = {
        info: infoSection,
        gist: gistSection,
        worksheet: worksheetSection,
    }

    return (
        <main className="workbook worksheet-container">
            <div className="worksheet-header" role="tablist">
                <span
                    className="section-button"
                    role="tab"
                    id="info-tab"
                    aria-controls="info-tabpanel"
                    aria-selected={ visible === 'info' }
                >
                    <Link
                        to={ `/workbook/${props.worksheet.pathTitle}#info` }
                        target="_self"
                        rel="noreferrer"
                        className={
                            'local-navlink local-navlink-info'
                            + `${visible === 'info' ? ' active' : ''}`
                        }
                        id="info-tab-navlink"
                        onClick={ headerClickHandler }
                        onKeyUp={ headerKeyUpHandler }
                        data-section="info"
                        ref={ infoTab }
                    >
                        <img
                            src={ Info }
                            className="icon icon-info"
                            alt="Info icon"
                        />
                        <span className="text-section-button">
                            info
                        </span>
                    </Link>
                </span>
                <span
                    className="section-button"
                    role="tab"
                    id="worksheet-tab"
                    aria-controls="worksheet-tabpanel"
                    aria-selected={ visible === 'worksheet' }
                >
                    <Link
                        to={ `/workbook/${props.worksheet.pathTitle}` }
                        target="_self"
                        rel="noreferrer"
                        className={
                            'local-navlink local-navlink-worksheet'
                            + `${visible === 'worksheet' ? ' active' : ''}`
                        }
                        id="worksheet-tab-navlink"
                        onClick={ headerClickHandler }
                        onKeyUp={ headerKeyUpHandler }
                        data-section="worksheet"
                        ref={ worksheetTab }
                    >
                        <img
                            src={ props.worksheet.icon }
                            className={
                                'icon '
                                + `icon-${props.worksheet.pathTitle}`
                            }
                            alt={
                                `${props.worksheet.properTitle} icon`
                            }
                        />
                        <span className="text-section-button">
                            { props.worksheet.title }
                        </span>
                    </Link>
                </span>
                <span
                    className="section-button"
                    role="tab"
                    id="gist-tab"
                    aria-controls="gist-tabpanel"
                    aria-selected={ visible === 'gist' }
                >
                    <Link
                        to={ `/workbook/${props.worksheet.pathTitle}#gist` }
                        target="_self"
                        rel="noreferrer"
                        className={
                            'local-navlink local-navlink-gist'
                            + `${visible === 'gist' ? ' active' : ''}`
                        }
                        id="gist-tab-navlink"
                        onClick={ headerClickHandler }
                        onKeyUp={ headerKeyUpHandler }
                        data-section="gist"
                        ref={ gistTab }
                    >
                        <img
                            src={ Code }
                            className="icon icon-code"
                            alt="Code icon"
                        />
                        <span className="text-section-button">
                            gist
                        </span>
                    </Link>
                </span>
            </div>
            { sections[visible] }
            <div className="worksheet-footer" />
        </main>
    )
}

WorksheetContainer.propTypes = {
    worksheet: PropTypes.shape({
        component: PropTypes.element.isRequired,
        icon: PropTypes.node.isRequired,
        infoComponent: PropTypes.element.isRequired,
        pathTitle: PropTypes.string.isRequired,
        properTitle: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
}

export default WorksheetContainer
