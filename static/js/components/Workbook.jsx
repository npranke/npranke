import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

import withPortraitListener from '@components/hoc/PortraitListener'

import Concentration from '@img/icon-concentration.png'
import Tower from '@img/icon-tower.png'
import Worksheet from '@img/icon-worksheet.png'

import {
    getLocationPageTitle,
    getSendEventHandler,
    sendEvent,
    sendPageview,
} from '@utils'

export function Workbook(props) {
    useEffect(() => {
        document.title = getLocationPageTitle('workbook')

        sendPageview()
    }, [])

    const concentrationRef = useRef(null)
    const towerRef = useRef(null)
    const worksheetRef = useRef(null)

    const getItemClickHandler = (item) => {
        return function itemClickHandler(event) {
            event.preventDefault()
            sendEvent('workbook', 'navigate', item)
            window.alert(`${item} will be here shortly`)
        }
    }

    const getItemKeyUpHandler = (right, left, up, down, home, end) => {
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
            ref={ concentrationRef }
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

    const worksheetTower = (
        <Link
            onClick={ getSendEventHandler(
                'workbook',
                'navigate',
                'tower',
            ) }
            to="/workbook/tower"
            target="_self"
            rel="noreferrer"
            ref={ towerRef }
        >
            <div className="button-worksheet-container">
                <span className="button-worksheet-wrapper">
                    <span className="button-worksheet">
                        <span className="button-worksheet-inner">
                            <img
                                src={ Tower }
                                className="icon icon-tower"
                                alt="Tower icon"
                            />
                            <span className="text-worksheet">
                                Tower
                            </span>
                        </span>
                    </span>
                </span>
            </div>
        </Link>
    )

    const worksheet = (
        <Link
            onClick={ getItemClickHandler('worksheet') }
            to="/workbook"
            target="_self"
            rel="noreferrer"
            ref={ worksheetRef }
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

    const workbookTableCellConcentration = props.isPortrait
        ? (
            <td
                id="workbook-worksheet-concentration"
                className="table-cell-workbook"
                role="gridcell"
                onKeyUp={ getItemKeyUpHandler(
                    concentrationRef,
                    concentrationRef,
                    concentrationRef,
                    towerRef,
                    concentrationRef,
                    worksheetRef,
                ) }
            >
                { worksheetConcentration }
            </td>
        ) : (
            <td
                id="workbook-worksheet-concentration"
                className="table-cell-workbook"
                role="gridcell"
                onKeyUp={ getItemKeyUpHandler(
                    towerRef,
                    concentrationRef,
                    concentrationRef,
                    concentrationRef,
                    concentrationRef,
                    worksheetRef,
                ) }
            >
                { worksheetConcentration }
            </td>
        )

    const workbookTableCellTower = props.isPortrait
        ? (
            <td
                id="workbook-worksheet-tower"
                className="table-cell-workbook"
                role="gridcell"
                onKeyUp={ getItemKeyUpHandler(
                    towerRef,
                    towerRef,
                    concentrationRef,
                    worksheetRef,
                    concentrationRef,
                    worksheetRef,
                ) }
            >
                { worksheetTower }
            </td>
        ) : (
            <td
                id="workbook-worksheet-tower"
                className="table-cell-workbook"
                role="gridcell"
                onKeyUp={ getItemKeyUpHandler(
                    worksheetRef,
                    concentrationRef,
                    towerRef,
                    towerRef,
                    concentrationRef,
                    worksheetRef,
                ) }
            >
                { worksheetTower }
            </td>
        )

    const workbookTableCellWorksheet = props.isPortrait
        ? (
            <td
                id="workbook-worksheet"
                className="table-cell-workbook"
                role="gridcell"
                onKeyUp={ getItemKeyUpHandler(
                    worksheetRef,
                    worksheetRef,
                    towerRef,
                    worksheetRef,
                    concentrationRef,
                    worksheetRef,
                ) }
            >
                { worksheet }
            </td>
        ) : (
            <td
                id="workbook-worksheet"
                className="table-cell-workbook"
                role="gridcell"
                onKeyUp={ getItemKeyUpHandler(
                    worksheetRef,
                    towerRef,
                    worksheetRef,
                    worksheetRef,
                    concentrationRef,
                    worksheetRef,
                ) }
            >
                { worksheet }
            </td>
        )

    const workbookTableBody = props.isPortrait
        ? (
            <tbody className="table-body-workbook">
                <tr className="table-row-workbook">
                    { workbookTableCellConcentration }
                </tr>
                <tr className="table-row-workbook">
                    { workbookTableCellTower }
                </tr>
                <tr className="table-row-workbook">
                    { workbookTableCellWorksheet }
                </tr>
            </tbody>
        ) : (
            <tbody className="table-body-workbook">
                <tr className="table-row-workbook">
                    { workbookTableCellConcentration }
                    { workbookTableCellTower }
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

Workbook.defaultProps = {
    isPortrait: false,
}

Workbook.propTypes = {
    isPortrait: PropTypes.bool,
}

export default withPortraitListener(Workbook)
