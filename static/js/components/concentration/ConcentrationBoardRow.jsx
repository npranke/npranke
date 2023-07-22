import PropTypes from 'prop-types'
import React from 'react'

function ConcentrationBoardRow(props) {
    const rowPictures = props.pictures.map((picture) => {
        const pictureName = Object.keys(picture)[0]

        const { id, pictureid } = picture[pictureName]

        let pictureImage
        if (props.first.id === id || props.second.id === id) {
            pictureImage = picture[pictureName].front
        } else if (props.matches.indexOf(pictureid) !== -1) {
            pictureImage = picture[pictureName].matched
        } else {
            pictureImage = picture[pictureName].back
        }

        return (
            <React.Fragment key={ id }>
                { pictureImage }
            </React.Fragment>
        )
    })

    return (
        <div className="board-row">
            { rowPictures }
        </div>
    )
}

ConcentrationBoardRow.defaultProps = {
    first: {
        id: null,
        pictureid: null,
    },
    matches: [],
    second: {
        id: null,
        pictureid: null,
    },
}

ConcentrationBoardRow.propTypes = {
    first: PropTypes.shape({
        id: PropTypes.string,
        pictureid: PropTypes.string,
    }),
    matches: PropTypes.arrayOf(PropTypes.string),
    pictures: PropTypes.arrayOf(
        PropTypes.objectOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                pictureid: PropTypes.string.isRequired,
                back: PropTypes.node.isRequired,
                front: PropTypes.node.isRequired,
                matched: PropTypes.node.isRequired,
            }).isRequired,
        ).isRequired,
    ).isRequired,
    second: PropTypes.shape({
        id: PropTypes.string,
        pictureid: PropTypes.string,
    }),
}

export default ConcentrationBoardRow
