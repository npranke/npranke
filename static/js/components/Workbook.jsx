import { Link } from 'react-router-dom'
import React from 'react'

import Concentration from '../../img/icon-concentration.png'
import { getLocationPageTitle, getSendEventHandler, sendEvent } from '../utils'
import Worksheet from '../../img/icon-worksheet.png'

class Workbook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPortrait: window.matchMedia(
                '(orientation: portrait)',
            ).matches,
        }

        this.concentration = React.createRef()
        this.worksheetB = React.createRef()

        this.getItemClickHandler = this.getItemClickHandler.bind(this)
        this.getItemKeyUpHandler = this.getItemKeyUpHandler.bind(this)
        this.updateIsPortrait = this.updateIsPortrait.bind(this)
    }

    componentDidMount() {
        document.title = getLocationPageTitle('workbook')

        window.matchMedia('(orientation: portrait)').addEventListener(
            'change',
            this.updateIsPortrait,
            false,
        )
    }

    componentWillUnmount() {
        window.matchMedia('(orientation: portrait)').removeEventListener(
            'change',
            this.updateIsPortrait,
            false,
        )
    }

    getItemClickHandler(item) {
        return function itemClickHandler(event) {
            event.preventDefault()
            sendEvent('workbook', 'navigate', item)
            alert(`${item} will be here shortly`)
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

    updateIsPortrait() {
        this.setState({
            isPortrait: window.matchMedia(
                '(orientation: portrait)',
            ).matches,
        })
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
                            <img
                                src={ Concentration }
                                className="icon icon-concentration"
                                alt="Concentration icon"
                            />
                            <span
                                className="text-worksheet text-concentration"
                            >
                                Concentration
                            </span>
                        </span>
                    </span>
                </div>
            </Link>
        )

        const worksheetB = (
            <Link
                onClick={ this.getItemClickHandler('worksheet b') }
                to="/workbook"
                target="_self"
                rel="noreferrer"
                innerRef={ this.worksheetB }
            >
                <div className="button-worksheet-container">
                    <span className="button-worksheet-wrapper">
                        <span className="button-worksheet">
                            <img
                                src={ Worksheet }
                                className="icon icon-worksheet"
                                alt="Worksheet icon"
                            />
                            <span className="text-worksheet">
                                Worksheet B
                            </span>
                        </span>
                    </span>
                </div>
            </Link>
        )

        const workbookTableCellConcentration = this.state.isPortrait
            ? (
                <td
                    id="workbook-worksheet-concentration"
                    className="table-cell-workbook"
                    role="gridcell"
                    onKeyUp={ this.getItemKeyUpHandler(
                        this.concentration,
                        this.concentration,
                        this.concentration,
                        this.worksheetB,
                        this.concentration,
                        this.worksheetB,
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
                        this.worksheetB,
                        this.concentration,
                        this.concentration,
                        this.concentration,
                        this.concentration,
                        this.worksheetB,
                    ) }
                >
                    { worksheetConcentration }
                </td>
            )

        const workbookTableCellWorksheetB = this.state.isPortrait
            ? (
                <td
                    id="workbook-worksheet-b"
                    className="table-cell-workbook"
                    role="gridcell"
                    onKeyUp={ this.getItemKeyUpHandler(
                        this.worksheetB,
                        this.worksheetB,
                        this.concentration,
                        this.worksheetB,
                        this.concentration,
                        this.worksheetB,
                    ) }
                >
                    { worksheetB }
                </td>
            ) : (
                <td
                    id="workbook-worksheet-b"
                    className="table-cell-workbook"
                    role="gridcell"
                    onKeyUp={ this.getItemKeyUpHandler(
                        this.worksheetB,
                        this.concentration,
                        this.worksheetB,
                        this.worksheetB,
                        this.concentration,
                        this.worksheetB,
                    ) }
                >
                    { worksheetB }
                </td>
            )

        const workbookTableBody = this.state.isPortrait
            ? (
                <tbody className="table-body-workbook">
                    <tr className="table-row-workbook">
                        { workbookTableCellConcentration }
                    </tr>
                    <tr className="table-row-workbook">
                        { workbookTableCellWorksheetB }
                    </tr>
                </tbody>
            ) : (
                <tbody className="table-body-workbook">
                    <tr className="table-row-workbook">
                        { workbookTableCellConcentration }
                        { workbookTableCellWorksheetB }
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

export default Workbook
