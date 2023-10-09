import { DragLayer } from 'react-dnd'
import PropTypes from 'prop-types'

export function collect(monitor) {
    return {
        sourceClientOffset: monitor.getSourceClientOffset(),
    }
}

export function TowerDiskDragLayer(props) {
    const previewStyle = props.sourceClientOffset ? {
        height: props.height,
        width: props.width,
        transform: (
            'translate('
            + `${props.sourceClientOffset.x}px, `
            + `${props.sourceClientOffset.y}px`
            + ')'
        ),
    } : { display: 'none' }

    return (
        <div
            className="disk-drag-layer"
            data-testid="disk-drag-layer-elem"
            style={ {
                pointerEvents: 'none',
                position: 'fixed',
                zIndex: 10,
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
            } }
        >
            <div
                className="disk dragging-preview"
                data-testid="disk-drag-preview-elem"
                style={ previewStyle }
            >
                { props.image }
            </div>
        </div>
    )
}

TowerDiskDragLayer.defaultProps = {
    height: 0,
    sourceClientOffset: null,
    width: 0,
}

TowerDiskDragLayer.propTypes = {
    height: PropTypes.number,
    image: PropTypes.node.isRequired,
    sourceClientOffset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    width: PropTypes.number,
}

export default DragLayer(collect)(TowerDiskDragLayer)
