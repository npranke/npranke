const reactdnd = jest.genMockFromModule('react-dnd')

function ComponentWrapper() {
    return (component) => { return component }
}

reactdnd.DragDropContext = ComponentWrapper
reactdnd.DragSource = ComponentWrapper
reactdnd.DropTarget = ComponentWrapper

module.exports = reactdnd
