import PropTypes from 'prop-types'
import React from 'react'

import useOffsetListener from '@components/hooks/OffsetListener'

function ComponentUseOffsetListenerMock(props) {
    const { height, width } = useOffsetListener(props.elementRef)

    return (
        <div className="component-use-offset-listener-mock">
            <div className="height">{ height }</div>
            <div className="width">{ width }</div>
        </div>
    )
}

ComponentUseOffsetListenerMock.propTypes = {
    elementRef: PropTypes.shape({
        current: PropTypes.shape({
            offsetHeight: PropTypes.number,
            offsetWidth: PropTypes.number,
        }),
    }).isRequired,
}

export default ComponentUseOffsetListenerMock
