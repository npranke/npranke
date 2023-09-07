import PropTypes from 'prop-types'

import useTimeRunner from '@components/hooks/TimeRunner'

function ComponentUseTimeRunnerMock(props) {
    const { centiseconds, seconds, minutes } = useTimeRunner(
        props.isRunning,
        props.shouldReset,
    )

    return (
        <div className="component-use-time-runner-mock">
            <div className="centiseconds" data-testid="centiseconds-div-elem">
                { centiseconds }
            </div>
            <div className="seconds" data-testid="seconds-div-elem">
                { seconds }
            </div>
            <div className="minutes" data-testid="minutes-div-elem">
                { minutes }
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
