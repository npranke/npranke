import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import Code from '../../img/icon-code.png'
import { getLocationPageTitle, sendEvent } from '../utils'
import Info from '../../img/icon-info.png'

class WorksheetContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = { visible: 'worksheet' }

        this.infoPanel = React.createRef()
        this.worksheetPanel = React.createRef()
        this.gistPanel = React.createRef()

        this.infoTab = React.createRef()
        this.worksheetTab = React.createRef()
        this.gistTab = React.createRef()

        this.headerClickHandler = this.headerClickHandler.bind(this)
        this.headerKeyUpHandler = this.headerKeyUpHandler.bind(this)
        this.updateVisible = this.updateVisible.bind(this)
    }

    componentDidMount() {
        document.title = getLocationPageTitle(this.props.worksheet.title)

        this.updateVisible(this.props.location.hash)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.hash !== prevProps.location.hash) {
            this.updateVisible(this.props.location.hash)
        }
    }

    updateVisible(locationHash) {
        if (locationHash === '#info') {
            this.setState({ visible: 'info' })
        } else if (locationHash === '#gist') {
            this.setState({ visible: 'gist' })
        } else {
            this.setState({ visible: 'worksheet' })
        }
    }

    headerClickHandler(event) {
        const { section } = event.currentTarget.dataset

        sendEvent(`${this.props.worksheet.title}`, 'navigate', section)

        this.setState({ visible: section })
    }

    headerKeyUpHandler(event) {
        const { section } = event.currentTarget.dataset

        if (event.key === 'Enter' || event.key === ' ') {
            this.setState(
                { visible: section },
                () => {
                    if (section === 'info') {
                        this.infoPanel.current.focus()
                    } else if (section === 'gist') {
                        this.gistPanel.current.focus()
                    } else {
                        this.worksheetPanel.current.focus()
                    }
                },
            )
        } else if (event.key === 'ArrowRight') {
            if (section === 'info') {
                this.worksheetTab.current.focus()
            } else if (section === 'worksheet') {
                this.gistTab.current.focus()
            }
        } else if (event.key === 'ArrowLeft') {
            if (section === 'gist') {
                this.worksheetTab.current.focus()
            } else if (section === 'worksheet') {
                this.infoTab.current.focus()
            }
        }
    }

    render() {
        const infoSection = (
            <div
                className="worksheet-section info-container"
                id="info-tabpanel"
                role="tabpanel"
                aria-expanded={ this.state.visible === 'info' }
                tabIndex="0"
                ref={ this.infoPanel }
            >
                <div className="worksheet-info">
                    <div className="worksheet-info-inner">
                        { this.props.worksheet.infoComponent }
                    </div>
                </div>
            </div>
        )

        const worksheetSection = (
            <div
                className={
                    'worksheet-section '
                    + `${this.props.worksheet.pathTitle}-container`
                }
                id="worksheet-tabpanel"
                role="tabpanel"
                aria-expanded={ this.state.visible === 'worksheet' }
                tabIndex="0"
                ref={ this.worksheetPanel }
            >
                { this.props.worksheet.component }
            </div>
        )

        const gistSection = (
            <div
                className="worksheet-section gist-container"
                id="gist-tabpanel"
                role="tabpanel"
                aria-expanded={ this.state.visible === 'gist' }
                tabIndex="0"
                ref={ this.gistPanel }
            >
                <iframe
                    id="worksheet-gist"
                    title={ `${this.props.worksheet.properTitle} gist` }
                    sandbox="allow-scripts allow-top-navigation"
                    referrerPolicy="no-referrer"
                    src={ `/gists/${this.props.worksheet.pathTitle}` }
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
                        aria-selected={ this.state.visible === 'info' }
                    >
                        <NavLink
                            to="#info"
                            target="_self"
                            rel="noreferrer"
                            isActive={ (match, location) => {
                                return location.hash === '#info'
                            } }
                            className="local-navlink local-navlink-info"
                            id="info-tab-navlink"
                            onClick={ this.headerClickHandler }
                            onKeyUp={ this.headerKeyUpHandler }
                            data-section="info"
                            aria-current="true"
                            innerRef={ this.infoTab }
                        >
                            <img
                                src={ Info }
                                className="icon icon-info"
                                alt="Info icon"
                            />
                            <span className="section-button-text">
                                info
                            </span>
                        </NavLink>
                    </span>
                    <span
                        className="section-button"
                        role="tab"
                        id="worksheet-tab"
                        aria-controls="worksheet-tabpanel"
                        aria-selected={ this.state.visible === 'worksheet' }
                    >
                        <NavLink
                            to="#"
                            target="_self"
                            rel="noreferrer"
                            isActive={ (match, location) => {
                                return location.hash === ''
                            } }
                            className="local-navlink local-navlink-worksheet"
                            id="worksheet-tab-navlink"
                            onClick={ this.headerClickHandler }
                            onKeyUp={ this.headerKeyUpHandler }
                            data-section="worksheet"
                            aria-current="true"
                            innerRef={ this.worksheetTab }
                        >
                            <img
                                src={ this.props.worksheet.icon }
                                className={
                                    'icon '
                                    + `icon-${this.props.worksheet.pathTitle}`
                                }
                                alt={
                                    `${this.props.worksheet.properTitle} icon`
                                }
                            />
                            <span className="section-button-text">
                                { this.props.worksheet.title }
                            </span>
                        </NavLink>
                    </span>
                    <span
                        className="section-button"
                        role="tab"
                        id="gist-tab"
                        aria-controls="gist-tabpanel"
                        aria-selected={ this.state.visible === 'gist' }
                    >
                        <NavLink
                            to="#gist"
                            target="_self"
                            rel="noreferrer"
                            isActive={ (match, location) => {
                                return location.hash === '#gist'
                            } }
                            className="local-navlink local-navlink-gist"
                            id="gist-tab-navlink"
                            onClick={ this.headerClickHandler }
                            onKeyUp={ this.headerKeyUpHandler }
                            data-section="gist"
                            aria-current="true"
                            innerRef={ this.gistTab }
                        >
                            <img
                                src={ Code }
                                className="icon icon-code"
                                alt="Code icon"
                            />
                            <span className="section-button-text">
                                gist
                            </span>
                        </NavLink>
                    </span>
                </div>
                { sections[this.state.visible] }
            </main>
        )
    }
}

WorksheetContainer.propTypes = {
    location: PropTypes.shape({
        hash: PropTypes.string,
    }).isRequired,
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
