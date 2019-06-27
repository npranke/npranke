import PropTypes from 'prop-types'
import React from 'react'

export function ConcentrationMatches(props) {
    const matchedPictures = props.matches.map((pictureid) => {
        return (
            <React.Fragment key={ pictureid }>
                { props.pictures[`picture${pictureid}`].image }
            </React.Fragment>
        )
    })

    return (
        <div className="matches">
            <div className="matches-header">
                <div className="left-text">
                    <span className="matches-portion">
                        matches:&emsp;
                    </span>
                    <span className="matches-portion number">
                        {
                            props.matches.length < 10
                                ? `0${props.matches.length}`
                                : `${props.matches.length}`
                        }
                    </span>
                </div>
                <div className="right-text">
                    <span className="time-portion">
                        time:&emsp;
                    </span>
                    <span className="time-portion number">
                        { props.minutes }
                    </span>
                    <span className="time-portion">
                        &ensp;:&ensp;
                    </span>
                    <span className="time-portion number">
                        { props.seconds }
                    </span>
                    <span className="time-portion">
                        &ensp;:&ensp;
                    </span>
                    <span className="time-portion number">
                        { props.centiseconds }
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
    centiseconds: '00',
    matches: [],
    minutes: '00',
    seconds: '00',
}

ConcentrationMatches.propTypes = {
    centiseconds: PropTypes.string,
    matches: PropTypes.arrayOf(PropTypes.string),
    minutes: PropTypes.string,
    pictures: PropTypes.objectOf(
        PropTypes.shape({
            image: PropTypes.node.isRequired,
        }).isRequired,
    ).isRequired,
    seconds: PropTypes.string,
}

export default ConcentrationMatches
