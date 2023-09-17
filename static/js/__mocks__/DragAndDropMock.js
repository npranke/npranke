import PropTypes from 'prop-types'

const reactdnd = jest.genMockFromModule('react-dnd')

function ComponentWrapper() {
    return (component) => { return component }
}

function DragPreviewImage(props) {
    return <div>{ props.src }</div>
}

DragPreviewImage.defaultProps = { src: '' }
DragPreviewImage.propTypes = { src: PropTypes.string }

reactdnd.DragDropContext = ComponentWrapper
reactdnd.DragLayer = ComponentWrapper
reactdnd.DragPreviewImage = DragPreviewImage
reactdnd.DragSource = ComponentWrapper
reactdnd.DropTarget = ComponentWrapper

module.exports = reactdnd
