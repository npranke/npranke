import PropTypes from 'prop-types'
import React from 'react'

import useTimeRunner from '@components/hooks/TimeRunner'

function ComponentUseTimeRunnerMock(props) {
    const { centiseconds, seconds, minutes } = useTimeRunner(
        props.isRunning,
        props.shouldReset,
    )

    return (
        <div className="component-use-time-runner-mock">
            <div className="centiseconds">{ centiseconds }</div>
            <div className="seconds">{ seconds }</div>
            <div className="minutes">{ minutes }</div>
        </div>
    )
}

ComponentUseTimeRunnerMock.defaultProps = {
    isRunning: false,
    shouldReset: false,
}

ComponentUseTimeRunnerMock.propTypes = {
    isRunning: PropTypes.bool,
    shouldReset: PropTypes.bool,
}

export default ComponentUseTimeRunnerMock
