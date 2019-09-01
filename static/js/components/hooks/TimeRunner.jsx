import React from 'react'

function useTimeRunner(isTimeRunning, shouldReset) {
    function reducer(state) {
        if (shouldReset) {
            return {
                start: null,
                centiseconds: '00',
                seconds: '00',
                minutes: '00',
            }
        }

        if (state.start === null) {
            return {
                start: Date.now(),
                centiseconds: state.centiseconds,
                seconds: state.seconds,
                minutes: state.minutes,
            }
        }

        const milliseconds = Date.now() - state.start
        let centiseconds = Math.trunc(milliseconds / 10) % 100
        let seconds = Math.trunc(milliseconds / 1000) % 60
        let minutes = Math.trunc(milliseconds / 60000)

        centiseconds = centiseconds < 10
            ? `0${centiseconds}`
            : `${centiseconds}`
        seconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`

        return {
            start: state.start,
            centiseconds,
            seconds,
            minutes,
        }
    }

    const [state, dispatch] = React.useReducer(
        reducer,
        {
            start: null,
            centiseconds: '00',
            seconds: '00',
            minutes: '00',
        },
    )

    React.useEffect(() => {
        function updateTime() {
            if (isTimeRunning || shouldReset) { dispatch() }
        }

        const timeInterval = setInterval(updateTime, 10)

        return () => {
            clearInterval(timeInterval)
        }
    }, [isTimeRunning, shouldReset])

    return state
}

export default useTimeRunner
