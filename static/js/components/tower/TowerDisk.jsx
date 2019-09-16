import { DragPreviewImage, DragSource } from 'react-dnd'
import PropTypes from 'prop-types'
import React from 'react'

import { EMPTY_PREVIEW_SOURCE } from '@constants/tower'

export const spec = {
    beginDrag: (props) => {
        return { diskid: props.diskid }
    },
    endDrag: (props, monitor) => {
        if (monitor.didDrop()) {
            const result = monitor.getDropResult()

            props.moveDisk(props.diskid, props.location, result.toLocation)
        }
    },
    canDrag: (props) => {
        return (
            !props.isComplete
            && props.diskids.indexOf(props.diskid) === props.diskids.length - 1
        )
    },
}

export function collect(connect, monitor) {
    return {
        connectDragPreview: connect.dragPreview(),
        connectDragSource: connect.dragSource(),
        canDrag: monitor.canDrag(),
        isDragging: monitor.isDragging(),
    }
}

export function TowerDisk(props) {
    const diskDragSource = props.connectDragSource(
        <div
            className={
                'disk'
                + `${props.canDrag ? ' candrag' : ''}`
                + `${props.isDragging ? ' dragging' : ''}`
            }
        >
            { props.image }
        </div>,
    )

    return (
        <React.Fragment key={ props.diskid }>
            <DragPreviewImage
                connect={ props.connectDragPreview }
                src={ EMPTY_PREVIEW_SOURCE }
            />
            { diskDragSource }
        </React.Fragment>
    )
}

TowerDisk.defaultProps = {
    canDrag: false,
    connectDragPreview: undefined,
    connectDragSource: undefined,
    diskids: [],
    height: 0,
    isComplete: false,
    isDragging: false,
    width: 0,
}

TowerDisk.propTypes = {
    canDrag: PropTypes.bool,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    diskid: PropTypes.string.isRequired,
    diskids: PropTypes.arrayOf(PropTypes.string),
    height: PropTypes.number,
    image: PropTypes.node.isRequired,
    isComplete: PropTypes.bool,
    isDragging: PropTypes.bool,
    location: PropTypes.string.isRequired,
    moveDisk: PropTypes.func.isRequired,
    width: PropTypes.number,
}

export default DragSource('disk', spec, collect)(TowerDisk)
