import PropTypes from 'prop-types'
import React from 'react'

import ConcentrationBoardRow from './ConcentrationBoardRow'

export function ConcentrationBoard(props) {
    const boardPictures = props.boardOrder.map((pictureName) => {
        return ({ [pictureName]: props.pictures[pictureName] })
    })

    return (
        props.isPortrait
            ? (
                <div className="board">
                    <div className="board-row-wrapper">
                        <ConcentrationBoardRow
                            pictures={ boardPictures.slice(0, 4) }
                            matches={ props.matches }
                            first={ props.first }
                            second={ props.second }
                        />
                    </div>
                    <div className="board-row-wrapper">
                        <ConcentrationBoardRow
                            pictures={ boardPictures.slice(4, 8) }
                            matches={ props.matches }
                            first={ props.first }
                            second={ props.second }
                        />
                    </div>
                    <div className="board-row-wrapper">
                        <ConcentrationBoardRow
                            pictures={ boardPictures.slice(8, 12) }
                            matches={ props.matches }
                            first={ props.first }
                            second={ props.second }
                        />
                    </div>
                    <div className="board-row-wrapper">
                        <ConcentrationBoardRow
                            pictures={ boardPictures.slice(12, 16) }
                            matches={ props.matches }
                            first={ props.first }
                            second={ props.second }
                        />
                    </div>
                    <div className="board-row-wrapper">
                        <ConcentrationBoardRow
                            pictures={ boardPictures.slice(16, 20) }
                            matches={ props.matches }
                            first={ props.first }
                            second={ props.second }
                        />
                    </div>
                    <div className="board-row-wrapper">
                        <ConcentrationBoardRow
                            pictures={ boardPictures.slice(20, 24) }
                            matches={ props.matches }
                            first={ props.first }
                            second={ props.second }
                        />
                    </div>
                </div>
            ) : (
                <div className="board">
                    <div className="board-row-wrapper">
                        <ConcentrationBoardRow
                            pictures={ boardPictures.slice(0, 6) }
                            matches={ props.matches }
                            first={ props.first }
                            second={ props.second }
                        />
                    </div>
                    <div className="board-row-wrapper">
                        <ConcentrationBoardRow
                            pictures={ boardPictures.slice(6, 12) }
                            matches={ props.matches }
                            first={ props.first }
                            second={ props.second }
                        />
                    </div>
                    <div className="board-row-wrapper">
                        <ConcentrationBoardRow
                            pictures={ boardPictures.slice(12, 18) }
                            matches={ props.matches }
                            first={ props.first }
                            second={ props.second }
                        />
                    </div>
                    <div className="board-row-wrapper">
                        <ConcentrationBoardRow
                            pictures={ boardPictures.slice(18, 24) }
                            matches={ props.matches }
                            first={ props.first }
                            second={ props.second }
                        />
                    </div>
                </div>
            )
    )
}

ConcentrationBoard.defaultProps = {
    first: {
        id: null,
        pictureid: null,
    },
    isPortrait: false,
    matches: [],
    second: {
        id: null,
        pictureid: null,
    },
}

ConcentrationBoard.propTypes = {
    boardOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
    first: PropTypes.shape({
        id: PropTypes.string,
        pictureid: PropTypes.string,
    }),
    isPortrait: PropTypes.bool,
    matches: PropTypes.arrayOf(PropTypes.string),
    pictures: PropTypes.objectOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            pictureid: PropTypes.string.isRequired,
            back: PropTypes.node.isRequired,
            front: PropTypes.node.isRequired,
            matched: PropTypes.node.isRequired,
        }).isRequired,
    ).isRequired,
    second: PropTypes.shape({
        id: PropTypes.string,
        pictureid: PropTypes.string,
    }),
}

export default ConcentrationBoard
