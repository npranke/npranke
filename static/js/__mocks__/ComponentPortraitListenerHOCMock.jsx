import PropTypes from 'prop-types'

function ComponentPortraitListenerHOCMock(props) {
    return (
        <div className="component-portrait-listener-hoc-mock" role="document">
            <div className="is-portrait">
                { props.isPortrait.toString() }
            </div>
        </div>
    )
}

ComponentPortraitListenerHOCMock.defaultProps = {
    isPortrait: false,
}

ComponentPortraitListenerHOCMock.propTypes = {
    isPortrait: PropTypes.bool,
}

export default ComponentPortraitListenerHOCMock
