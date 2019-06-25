import PropTypes from 'prop-types'
import React from 'react'

import ConcentrationBoard from './ConcentrationBoard'
import ConcentrationMatches from './ConcentrationMatches'
import { getSendEventHandler, sendEvent } from '../utils'
import Picture0 from '../../img/concentration-22332-pink-plateau.jpg'
import Picture1 from '../../img/concentration-22512-blue-center.jpg'
import Picture2 from '../../img/concentration-22585-teal-ripples.jpg'
import Picture3 from '../../img/concentration-22594-burgundy-spot.jpg'
import Picture4 from '../../img/concentration-23056-mauve-mound.jpg'
import Picture5 from '../../img/concentration-23080-lavendar-corner.jpg'
import Picture6 from '../../img/concentration-23103-light-pool.jpg'
import Picture7 from '../../img/concentration-23183-brown-variations.jpg'
import Picture8 from '../../img/concentration-23184-purple-surface.jpg'
import Picture9 from '../../img/concentration-23231-bright-swoop.jpg'
import Picture10 from '../../img/concentration-23233-dark-ridges.jpg'
import Picture11 from '../../img/concentration-23239-neon-plains.jpg'
import PictureBack from '../../img/concentration-20285-opportunity-rover.jpg'
import withPortraitListener from './hoc/PortraitListener'

const pictureSources = {
    0: { source: Picture0, sourceid: 22332 },
    1: { source: Picture1, sourceid: 22512 },
    2: { source: Picture2, sourceid: 22585 },
    3: { source: Picture3, sourceid: 22594 },
    4: { source: Picture4, sourceid: 23056 },
    5: { source: Picture5, sourceid: 23080 },
    6: { source: Picture6, sourceid: 23103 },
    7: { source: Picture7, sourceid: 23183 },
    8: { source: Picture8, sourceid: 23184 },
    9: { source: Picture9, sourceid: 23231 },
    10: { source: Picture10, sourceid: 23233 },
    11: { source: Picture11, sourceid: 23239 },
}

export class Concentration extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isTimeRunning: false,
            centiseconds: '00',
            seconds: '00',
            minutes: '00',
            internalMatches: [],
            displayedMatches: [],
            first: { id: null, pictureid: null },
            second: { id: null, pictureid: null },
        }

        this.pictureClickHandler = this.pictureClickHandler.bind(this)
        this.pictureKeyUpHandler = this.pictureKeyUpHandler.bind(this)
        this.updateTime = this.updateTime.bind(this)

        this.matchesPictures = Object.keys(pictureSources).reduce(
            (pictureAccumulator, pictureid) => {
                const mroPIA = `NASA/JPL Mars Reconnaissance Orbiter PIA${
                    pictureSources[pictureid].sourceid
                }`

                pictureAccumulator[`picture${pictureid}`] = {
                    image: (
                        <a
                            onClick={ getSendEventHandler(
                                'concentration',
                                'navigate',
                                `PIA${pictureSources[pictureid].sourceid}`,
                            ) }
                            href={
                                'https://www.jpl.nasa.gov/spaceimages/'
                                + 'details.php?'
                                + `id=PIA${pictureSources[pictureid].sourceid}`
                            }
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="NASA/JPL Space Images"
                        >
                            <img
                                src={ pictureSources[pictureid].source }
                                className="picture"
                                alt={ mroPIA }
                                title={ mroPIA }
                            />
                        </a>
                    ),
                }

                return pictureAccumulator
            },
            {},
        )

        this.boardPictures = Object.keys(pictureSources).reduce(
            (pictureAccumulator, pictureid) => {
                const mroPIA = `NASA/JPL Mars Reconnaissance Orbiter PIA${
                    pictureSources[pictureid].sourceid
                }`
                const merPIA = 'NASA/JPL Mars Exploration Rover PIA20285'

                pictureAccumulator[`picture${pictureid}-a`] = {
                    id: `${pictureid}-a`,
                    pictureid: `${pictureid}`,
                    back: (
                        <img
                            onClick={ this.pictureClickHandler }
                            onKeyUp={ this.pictureKeyUpHandler }
                            role="button"
                            tabIndex="0"
                            data-id={ `${pictureid}-a` }
                            data-pictureid={ pictureid }
                            src={ PictureBack }
                            className="picture picture-back"
                            alt={ merPIA }
                        />
                    ),
                    front: (
                        <img
                            src={ pictureSources[pictureid].source }
                            className="picture picture-front"
                            alt={ mroPIA }
                        />
                    ),
                    matched: (
                        <img
                            src={ pictureSources[pictureid].source }
                            className="picture picture-matched"
                            alt={ mroPIA }
                        />
                    ),
                }

                pictureAccumulator[`picture${pictureid}-b`] = {
                    id: `${pictureid}-b`,
                    pictureid: `${pictureid}`,
                    back: (
                        <img
                            onClick={ this.pictureClickHandler }
                            onKeyUp={ this.pictureKeyUpHandler }
                            role="button"
                            tabIndex="0"
                            data-id={ `${pictureid}-b` }
                            data-pictureid={ pictureid }
                            src={ PictureBack }
                            className="picture picture-back"
                            alt={ merPIA }
                        />
                    ),
                    front: (
                        <img
                            src={ pictureSources[pictureid].source }
                            className="picture picture-front"
                            alt={ mroPIA }
                        />
                    ),
                    matched: (
                        <img
                            src={ pictureSources[pictureid].source }
                            className="picture picture-matched"
                            alt={ mroPIA }
                        />
                    ),
                }

                return pictureAccumulator
            },
            {},
        )

        this.boardOrder = Object.keys(
            this.boardPictures,
        ).map((pictureName) => {
            return { sortValue: Math.random(), pictureName }
        }).sort((pictureWrapperA, pictureWrapperB) => {
            return pictureWrapperA.sortValue - pictureWrapperB.sortValue
        }).map((pictureWrapper) => {
            return pictureWrapper.pictureName
        })
    }

    componentDidMount() {
        this.timeInterval = setInterval(this.updateTime, 10)
    }

    componentWillUnmount() {
        clearTimeout(this.pictureTimeout)

        clearInterval(this.timeInterval)
    }

    updateTime() {
        this.setState((state) => {
            if (!state.isTimeRunning || state.internalMatches.length === 12) {
                return { isTimeRunning: false }
            }

            let centiseconds = parseInt(state.centiseconds, 10) + 1
            let seconds = parseInt(state.seconds, 10)
            let minutes = parseInt(state.minutes, 10)

            if (centiseconds >= 100) {
                centiseconds %= 100
                seconds += 1
            }
            if (seconds >= 60) {
                seconds %= 60
                minutes += 1
            }

            centiseconds = centiseconds < 10
                ? `0${centiseconds}`
                : `${centiseconds}`
            seconds = seconds < 10 ? `0${seconds}` : `${seconds}`
            minutes = minutes < 10 ? `0${minutes}` : `${minutes}`

            return {
                centiseconds,
                seconds,
                minutes,
            }
        })
    }

    pictureClickHandler(event) {
        const { id, pictureid } = event.currentTarget.dataset

        sendEvent('concentration', 'click', 'picture')

        this.setState((state) => {
            if (state.first.id === null) {
                return {
                    first: { id, pictureid },
                    displayedMatches: state.internalMatches,
                    isTimeRunning: true,
                }
            } else if (
                state.second.id === null && state.first.pictureid === pictureid
            ) {
                sendEvent('concentration', 'find', 'match')

                this.pictureTimeout = setTimeout(() => {
                    this.setState({
                        first: { id: null, pictureid: null },
                        second: { id: null, pictureid: null },
                        displayedMatches: state.displayedMatches.concat(
                            [pictureid],
                        ),
                        isTimeRunning: true,
                    })
                }, 1000)

                return {
                    second: { id, pictureid },
                    internalMatches: state.internalMatches.concat([pictureid]),
                    displayedMatches: state.internalMatches,
                    isTimeRunning: true,
                }
            } else if (
                state.second.id === null && state.first.pictureid !== pictureid
            ) {
                this.pictureTimeout = setTimeout(() => {
                    this.setState({
                        first: { id: null, pictureid: null },
                        second: { id: null, pictureid: null },
                        displayedMatches: state.internalMatches,
                        isTimeRunning: true,
                    })
                }, 2000)

                return {
                    second: { id, pictureid },
                    displayedMatches: state.internalMatches,
                    isTimeRunning: true,
                }
            } else if (state.first.id && state.second.id) {
                clearTimeout(this.pictureTimeout)

                return {
                    first: { id, pictureid },
                    second: { id: null, pictureid: null },
                    displayedMatches: state.internalMatches,
                    isTimeRunning: true,
                }
            }

            return {
                displayedMatches: state.internalMatches,
                isTimeRunning: true,
            }
        })
    }

    pictureKeyUpHandler(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            this.pictureClickHandler(event)
        }
    }

    render() {
        return (
            <div className="concentration">
                <div className="concentration-inner">
                    <div className="matches-wrapper">
                        <ConcentrationMatches
                            pictures={ this.matchesPictures }
                            matches={ this.state.displayedMatches }
                            centiseconds={ this.state.centiseconds }
                            minutes={ this.state.minutes }
                            seconds={ this.state.seconds }
                        />
                    </div>
                    <div className="board-wrapper">
                        <ConcentrationBoard
                            pictures={ this.boardPictures }
                            boardOrder={ this.boardOrder }
                            isPortrait={ this.props.isPortrait }
                            first={ this.state.first }
                            second={ this.state.second }
                            matches={ this.state.internalMatches }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

Concentration.defaultProps = {
    isPortrait: false,
}

Concentration.propTypes = {
    isPortrait: PropTypes.bool,
}

export default withPortraitListener(Concentration)
