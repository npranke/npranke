import PropTypes from 'prop-types'
import React from 'react'

import useTimeRunner from '@components/hooks/TimeRunner'

function ComponentUseTimeRunnerMock(props) {
    const { centiseconds, seconds, minutes } = useTimeRunner(
        props.isTimeRunning,
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
    isTimeRunning: false,
}

ComponentUseTimeRunnerMock.propTypes = {
    isTimeRunning: PropTypes.bool,
}

export default ComponentUseTimeRunnerMock
