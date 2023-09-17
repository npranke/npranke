import PropTypes from 'prop-types'

import useTimeRunner from '@components/hooks/TimeRunner'

function ComponentUseTimeRunnerMock(props) {
    const { centiseconds, seconds, minutes } = useTimeRunner(
        props.isRunning,
        props.shouldReset,
    )

    return (
        <div className="component-use-time-runner-mock">
            <div className="minutes" role="timer">
                { minutes }
            </div>
            <div className="seconds" role="timer">
                { seconds }
            </div>
            <div className="centiseconds" role="timer">
                { centiseconds }
            </div>
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
