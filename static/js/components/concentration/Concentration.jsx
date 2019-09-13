import PropTypes from 'prop-types'
import React from 'react'

import ConcentrationBoard from '@components/concentration/ConcentrationBoard'
import ConcentrationMatches from
    '@components/concentration/ConcentrationMatches'
import withPortraitListener from '@components/hoc/PortraitListener'

import { PICTURE_BACK, PICTURE_SOURCES } from '@constants/concentration'

import { getSendEventHandler, sendEvent } from '@utils'

export class Concentration extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isTimeRunning: false,
            turns: 0,
            internalMatches: [],
            displayedMatches: [],
            first: { id: null, pictureid: null },
            second: { id: null, pictureid: null },
        }

        this.pictureClickHandler = this.pictureClickHandler.bind(this)
        this.pictureKeyUpHandler = this.pictureKeyUpHandler.bind(this)

        this.matchesPictures = Object.keys(PICTURE_SOURCES).reduce(
            (pictureAccumulator, pictureid) => {
                const mroPIA = `NASA/JPL Mars Reconnaissance Orbiter PIA${
                    PICTURE_SOURCES[pictureid].sourceid
                }`

                pictureAccumulator[`picture${pictureid}`] = {
                    image: (
                        <a
                            onClick={ getSendEventHandler(
                                'concentration',
                                'navigate',
                                `PIA${PICTURE_SOURCES[pictureid].sourceid}`,
                            ) }
                            href={
                                'https://www.jpl.nasa.gov/spaceimages/'
                                + 'details.php?id='
                                + `PIA${PICTURE_SOURCES[pictureid].sourceid}`
                            }
                            target="_blank"
                            rel="noreferrer noopener external"
                            aria-label="NASA/JPL Space Images"
                        >
                            <img
                                src={ PICTURE_SOURCES[pictureid].source }
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

        this.boardPictures = Object.keys(PICTURE_SOURCES).reduce(
            (pictureAccumulator, pictureid) => {
                const mroPIA = `NASA/JPL Mars Reconnaissance Orbiter PIA${
                    PICTURE_SOURCES[pictureid].sourceid
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
                            src={ PICTURE_BACK }
                            className="picture picture-back"
                            alt={ merPIA }
                        />
                    ),
                    front: (
                        <img
                            src={ PICTURE_SOURCES[pictureid].source }
                            className="picture picture-front"
                            alt={ mroPIA }
                        />
                    ),
                    matched: (
                        <img
                            src={ PICTURE_SOURCES[pictureid].source }
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
                            src={ PICTURE_BACK }
                            className="picture picture-back"
                            alt={ merPIA }
                        />
                    ),
                    front: (
                        <img
                            src={ PICTURE_SOURCES[pictureid].source }
                            className="picture picture-front"
                            alt={ mroPIA }
                        />
                    ),
                    matched: (
                        <img
                            src={ PICTURE_SOURCES[pictureid].source }
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

    componentWillUnmount() {
        clearTimeout(this.pictureTimeout)
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

                const isLastMatch = state.internalMatches.length === 11

                if (isLastMatch) {
                    sendEvent(
                        'concentration',
                        'complete',
                        'matches',
                        state.turns + 1,
                    )
                }

                this.pictureTimeout = setTimeout(() => {
                    this.setState({
                        first: { id: null, pictureid: null },
                        second: { id: null, pictureid: null },
                        displayedMatches: state.displayedMatches.concat(
                            [pictureid],
                        ),
                        isTimeRunning: !isLastMatch,
                    })
                }, 1000)

                return {
                    turns: state.turns + 1,
                    second: { id, pictureid },
                    internalMatches: state.internalMatches.concat([pictureid]),
                    displayedMatches: state.internalMatches,
                    isTimeRunning: !isLastMatch,
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
                    turns: state.turns + 1,
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
                <div className="matches-wrapper">
                    <ConcentrationMatches
                        isTimeRunning={ this.state.isTimeRunning }
                        pictures={ this.matchesPictures }
                        matches={ this.state.displayedMatches }
                        turns={ this.state.turns }
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
