import PropTypes from 'prop-types'
import React from 'react'

import useTimeRunner from '@components/hooks/TimeRunner'

function ConcentrationMatches(props) {
    const matchedPictures = props.matches.map((pictureid) => {
        return (
            <React.Fragment key={ pictureid }>
                { props.pictures[`picture${pictureid}`].image }
            </React.Fragment>
        )
    })

    const { centiseconds, seconds, minutes } = useTimeRunner(
        props.isTimeRunning,
    )

    return (
        <div className="matches">
            <div className="matches-header">
                <div className="left-text">
                    <span className="matches-text">
                        <span className="matches-portion">
                            matches:&ensp;
                        </span>
                        <span className="matches-portion number">
                            {
                                props.matches.length < 10
                                    ? `0${props.matches.length}`
                                    : `${props.matches.length}`
                            }
                        </span>
                    </span>
                    <span className="turns-text">
                        <span className="turns-portion">
                            turns:&ensp;
                        </span>
                        <span className="turns-portion number">
                            {
                                props.turns < 10
                                    ? `0${props.turns}`
                                    : `${props.turns}`
                            }
                        </span>
                    </span>
                </div>
                <div className="right-text">
                    <span className="time-text">
                        <span className="time-portion">
                            time:&emsp;
                        </span>
                        <span className="time-portion number">
                            { minutes }
                        </span>
                        <span className="time-portion">
                            &ensp;:&ensp;
                        </span>
                        <span className="time-portion number">
                            { seconds }
                        </span>
                        <span className="time-portion">
                            &ensp;:&ensp;
                        </span>
                        <span className="time-portion number">
                            { centiseconds }
                        </span>
                    </span>
                </div>
            </div>
            <div className="matches-pictures">
                { matchedPictures }
            </div>
        </div>
    )
}

ConcentrationMatches.defaultProps = {
    isTimeRunning: false,
    matches: [],
    turns: 0,
}

ConcentrationMatches.propTypes = {
    isTimeRunning: PropTypes.bool,
    matches: PropTypes.arrayOf(PropTypes.string),
    pictures: PropTypes.objectOf(
        PropTypes.shape({
            image: PropTypes.node.isRequired,
        }).isRequired,
    ).isRequired,
    turns: PropTypes.number,
}

export default ConcentrationMatches
