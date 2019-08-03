import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import withPortraitListener from '@components/hoc/PortraitListener'

import Concentration from '@img/icon-concentration.png'
import Worksheet from '@img/icon-worksheet.png'

import {
    getLocationPageTitle,
    getSendEventHandler,
    sendEvent,
    sendPageview,
} from '@utils'

export class Workbook extends React.Component {
    constructor(props) {
        super(props)

        this.concentration = React.createRef()
        this.worksheet = React.createRef()

        this.getItemClickHandler = this.getItemClickHandler.bind(this)
        this.getItemKeyUpHandler = this.getItemKeyUpHandler.bind(this)
    }

    componentDidMount() {
        document.title = getLocationPageTitle('workbook')

        sendPageview()
    }

    getItemClickHandler(item) {
        return function itemClickHandler(event) {
            event.preventDefault()
            sendEvent('workbook', 'navigate', item)
            window.alert(`${item} will be here shortly`)
        }
    }

    getItemKeyUpHandler(right, left, up, down, home, end) {
        return function itemKeyUpHandler(event) {
            if (event.key === 'ArrowRight') {
                right.current.focus()
            } else if (event.key === 'ArrowLeft') {
                left.current.focus()
            } else if (event.key === 'ArrowUp') {
                up.current.focus()
            } else if (event.key === 'ArrowDown') {
                down.current.focus()
            } else if (event.key === 'Home') {
                home.current.focus()
            } else if (event.key === 'End') {
                end.current.focus()
            }
        }
    }

    render() {
        const worksheetConcentration = (
            <Link
                onClick={ getSendEventHandler(
                    'workbook',
                    'navigate',
                    'concentration',
                ) }
                to="/workbook/concentration"
                target="_self"
                rel="noreferrer"
                innerRef={ this.concentration }
            >
                <div className="button-worksheet-container">
                    <span className="button-worksheet-wrapper">
                        <span className="button-worksheet">
                            <span className="button-worksheet-inner">
                                <img
                                    src={ Concentration }
                                    className="icon icon-concentration"
                                    alt="Concentration icon"
                                />
                                <span className="text-worksheet">
                                    Concentration
                                </span>
                            </span>
                        </span>
                    </span>
                </div>
            </Link>
        )

        const worksheet = (
            <Link
                onClick={ this.getItemClickHandler('worksheet') }
                to="/workbook"
                target="_self"
                rel="noreferrer"
                innerRef={ this.worksheet }
            >
                <div className="button-worksheet-container">
                    <span className="button-worksheet-wrapper">
                        <span className="button-worksheet">
                            <span className="button-worksheet-inner">
                                <img
                                    src={ Worksheet }
                                    className="icon icon-worksheet"
                                    alt="Worksheet icon"
                                />
                                <span className="text-worksheet">
                                    Worksheet
                                </span>
                            </span>
                        </span>
                    </span>
                </div>
            </Link>
        )

        const workbookTableCellConcentration = this.props.isPortrait
            ? (
                <td
                    id="workbook-worksheet-concentration"
                    className="table-cell-workbook"
                    role="gridcell"
                    onKeyUp={ this.getItemKeyUpHandler(
                        this.concentration,
                        this.concentration,
                        this.concentration,
                        this.worksheet,
                        this.concentration,
                        this.worksheet,
                    ) }
                >
                    { worksheetConcentration }
                </td>
            ) : (
                <td
                    id="workbook-worksheet-concentration"
                    className="table-cell-workbook"
                    role="gridcell"
                    onKeyUp={ this.getItemKeyUpHandler(
                        this.worksheet,
                        this.concentration,
                        this.concentration,
                        this.concentration,
                        this.concentration,
                        this.worksheet,
                    ) }
                >
                    { worksheetConcentration }
                </td>
            )

        const workbookTableCellWorksheet = this.props.isPortrait
            ? (
                <td
                    id="workbook-worksheet"
                    className="table-cell-workbook"
                    role="gridcell"
                    onKeyUp={ this.getItemKeyUpHandler(
                        this.worksheet,
                        this.worksheet,
                        this.concentration,
                        this.worksheet,
                        this.concentration,
                        this.worksheet,
                    ) }
                >
                    { worksheet }
                </td>
            ) : (
                <td
                    id="workbook-worksheet"
                    className="table-cell-workbook"
                    role="gridcell"
                    onKeyUp={ this.getItemKeyUpHandler(
                        this.worksheet,
                        this.concentration,
                        this.worksheet,
                        this.worksheet,
                        this.concentration,
                        this.worksheet,
                    ) }
                >
                    { worksheet }
                </td>
            )

        const workbookTableBody = this.props.isPortrait
            ? (
                <tbody className="table-body-workbook">
                    <tr className="table-row-workbook">
                        { workbookTableCellConcentration }
                    </tr>
                    <tr className="table-row-workbook">
                        { workbookTableCellWorksheet }
                    </tr>
                </tbody>
            ) : (
                <tbody className="table-body-workbook">
                    <tr className="table-row-workbook">
                        { workbookTableCellConcentration }
                        { workbookTableCellWorksheet }
                    </tr>
                </tbody>
            )

        return (
            <main className="workbook">
                <table className="table-workbook" role="grid">
                    { workbookTableBody }
                </table>
            </main>
        )
    }
}

Workbook.defaultProps = {
    isPortrait: false,
}

Workbook.propTypes = {
    isPortrait: PropTypes.bool,
}

export default withPortraitListener(Workbook)
