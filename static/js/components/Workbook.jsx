import React from 'react'

import { getLocationPageTitle, sendEvent } from '../utils'

class Workbook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPortrait: window.matchMedia(
                '(orientation: portrait)',
            ).matches,
        }

        this.worksheetA = React.createRef()
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

    getItemKeyUpHandler(item, right, left, up, down, home, end) {
        return function itemKeyUpHandler(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                sendEvent('workbook', 'navigate', item)
                alert(`${item} will be here shortly`)
            } else if (event.key === 'ArrowRight') {
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

    getItemClickHandler(item) {
        return function itemClickHandler(event) {
            event.preventDefault()
            sendEvent('workbook', 'navigate', item)
            alert(`${item} will be here shortly`)
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
        const workbookTableCellWorksheetA = this.state.isPortrait
            ? (
                <td
                    id="workbook-worksheet-a"
                    className="table-cell-workbook"
                    role="gridcell"
                    tabIndex="0"
                    onClick={ this.getItemClickHandler('worksheet a') }
                    onKeyUp={ this.getItemKeyUpHandler(
                        'worksheet a',
                        this.worksheetA,
                        this.worksheetA,
                        this.worksheetA,
                        this.worksheetB,
                        this.worksheetA,
                        this.worksheetB,
                    ) }
                    ref={ this.worksheetA }
                >
                    worksheet a
                </td>
            ) : (
                <td
                    id="workbook-worksheet-a"
                    className="table-cell-workbook"
                    role="gridcell"
                    tabIndex="0"
                    onClick={ this.getItemClickHandler('worksheet a') }
                    onKeyUp={ this.getItemKeyUpHandler(
                        'worksheet a',
                        this.worksheetB,
                        this.worksheetA,
                        this.worksheetA,
                        this.worksheetA,
                        this.worksheetA,
                        this.worksheetB,
                    ) }
                    ref={ this.worksheetA }
                >
                    worksheet a
                </td>
            )

        const workbookTableCellWorksheetB = this.state.isPortrait
            ? (
                <td
                    id="workbook-worksheet-b"
                    className="table-cell-workbook"
                    role="gridcell"
                    tabIndex="0"
                    onClick={ this.getItemClickHandler('worksheet b') }
                    onKeyUp={ this.getItemKeyUpHandler(
                        'worksheet b',
                        this.worksheetB,
                        this.worksheetB,
                        this.worksheetA,
                        this.worksheetB,
                        this.worksheetA,
                        this.worksheetB,
                    ) }
                    ref={ this.worksheetB }
                >
                    worksheet b
                </td>
            ) : (
                <td
                    id="workbook-worksheet-b"
                    className="table-cell-workbook"
                    role="gridcell"
                    tabIndex="0"
                    onClick={ this.getItemClickHandler('worksheet b') }
                    onKeyUp={ this.getItemKeyUpHandler(
                        'worksheet b',
                        this.worksheetB,
                        this.worksheetA,
                        this.worksheetB,
                        this.worksheetB,
                        this.worksheetA,
                        this.worksheetB,
                    ) }
                    ref={ this.worksheetB }
                >
                    worksheet b
                </td>
            )

        const workbookTableBody = this.state.isPortrait
            ? (
                <tbody className="table-body-workbook">
                    <tr className="table-row-workbook">
                        { workbookTableCellWorksheetA }
                    </tr>
                    <tr className="table-row-workbook">
                        { workbookTableCellWorksheetB }
                    </tr>
                </tbody>
            ) : (
                <tbody className="table-body-workbook">
                    <tr className="table-row-workbook">
                        { workbookTableCellWorksheetA }
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
