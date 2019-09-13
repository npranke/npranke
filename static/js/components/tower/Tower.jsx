import { DragDropContext } from 'react-dnd'
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import MultiBackend from 'react-dnd-multi-backend'
import PropTypes from 'prop-types'
import React from 'react'

import TowerLocation from '@components/tower/TowerLocation'
import TowerSettings from '@components/tower/TowerSettings'
import withPortraitListener from '@components/hoc/PortraitListener'

import { LAYOUTS, LOCATIONS, TOWER_SOURCES } from '@constants/tower'

import { getSendEventHandler, sendEvent } from '@utils'

export class Tower extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isComplete: false,
            isTimeRunning: false,
            shouldTimeReset: false,
            moves: 0,
            disks: 3,
            origin: [],
            buffer: [],
            target: [],
        }

        this.moveDisk = this.moveDisk.bind(this)
        this.updateDisks = this.updateDisks.bind(this)

        this.towers = Object.keys(TOWER_SOURCES).reduce(
            (towerAccumulator, tower) => {
                towerAccumulator[tower] = {
                    clickHandler: getSendEventHandler(
                        'tower',
                        'navigate',
                        `PIA${TOWER_SOURCES[tower].sourceid}`,
                    ),
                    link: (
                        'https://www.jpl.nasa.gov/spaceimages/details.php?'
                        + `id=PIA${TOWER_SOURCES[tower].sourceid}`
                    ),
                }

                LAYOUTS.forEach((layout) => {
                    towerAccumulator[tower][layout] = TOWER_SOURCES[
                        tower
                    ].disks[layout].map((disksource, index) => {
                        const description = (
                            'NASA/JPL Juno PIA'
                            + `${TOWER_SOURCES[tower].sourceid}, `
                            + `disk ${index + 1} of ${tower}`
                        )

                        return {
                            diskid: `${index + 1}`,
                            image: (
                                <img
                                    src={ disksource }
                                    className="disk-image"
                                    alt={ description }
                                    title={ description }
                                />
                            ),
                        }
                    })
                })

                return towerAccumulator
            },
            {},
        )
    }

    componentDidMount() {
        this.originTimeout = setTimeout(() => {
            this.setState((state) => {
                return {
                    origin: Array.from(
                        { length: state.disks },
                        (value, index) => { return `${index + 1}` },
                    ).reverse(),
                }
            })
        }, 400)
    }

    componentWillUnmount() {
        clearTimeout(this.originTimeout)
    }

    moveDisk(diskid, fromLocation, toLocation) {
        this.setState((state) => {
            const fromLocationDisks = state[fromLocation].filter(
                (fromDisk) => {
                    return fromDisk !== diskid
                },
            )
            const toLocationDisks = state[toLocation].concat([diskid])
            const isComplete = (
                toLocation === 'target'
                && toLocationDisks.length === state.disks
            )
            const isTimeRunning = !isComplete

            sendEvent('tower', 'move', 'disk')

            if (isComplete) {
                sendEvent(
                    'tower',
                    'complete',
                    `disks-${state.disks}`,
                    state.moves + 1,
                )
            }

            return {
                isComplete,
                isTimeRunning,
                shouldTimeReset: false,
                moves: state.moves + 1,
                [fromLocation]: fromLocationDisks,
                [toLocation]: toLocationDisks,
            }
        })
    }

    updateDisks(disks) {
        const updatedDisks = parseInt(disks, 10)

        sendEvent('tower', 'select', `disks-${updatedDisks}`)

        this.setState(() => {
            this.originTimeout = setTimeout(() => {
                this.setState({
                    origin: Array.from(
                        { length: updatedDisks },
                        (value, index) => { return `${index + 1}` },
                    ).reverse(),
                })
            }, 200)

            return {
                isComplete: false,
                isTimeRunning: false,
                shouldTimeReset: true,
                moves: 0,
                disks: updatedDisks,
                origin: [],
                buffer: [],
                target: [],
            }
        })
    }

    render() {
        const towerLocations = LOCATIONS.map((location) => {
            return (
                <React.Fragment key={ location }>
                    <div className="location-wrapper">
                        <TowerLocation
                            location={ location }
                            diskids={ this.state[location] }
                            disks={ this.state.disks }
                            tower={ this.towers[this.state.disks] }
                            moveDisk={ this.moveDisk }
                            isComplete={ this.state.isComplete }
                            isPortrait={ this.props.isPortrait }
                        />
                    </div>
                </React.Fragment>
            )
        })

        return (
            <div className="tower">
                <div className="settings-wrapper">
                    <TowerSettings
                        disks={ this.state.disks }
                        isTimeRunning={ this.state.isTimeRunning }
                        shouldTimeReset={ this.state.shouldTimeReset }
                        moves={ this.state.moves }
                        updateDisks={ this.updateDisks }
                    />
                </div>
                <div className="locations-wrapper">
                    <div className="locations-container">
                        { towerLocations }
                    </div>
                </div>
            </div>
        )
    }
}

Tower.defaultProps = {
    isPortrait: false,
}

Tower.propTypes = {
    isPortrait: PropTypes.bool,
}

export default DragDropContext(MultiBackend(HTML5toTouch))(
    withPortraitListener(Tower),
)
