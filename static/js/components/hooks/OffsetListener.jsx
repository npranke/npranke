import React from 'react'

function useOffsetListener(elementRef) {
    function reducer() {
        if (elementRef.current) {
            return {
                height: elementRef.current.offsetHeight,
                width: elementRef.current.offsetWidth,
            }
        }

        return {
            height: 0,
            width: 0,
        }
    }

    const [state, dispatch] = React.useReducer(
        reducer,
        {
            height: 0,
            width: 0,
        },
    )

    React.useLayoutEffect(() => {
        function updateOffset() { dispatch() }

        updateOffset()

        window.addEventListener('resize', updateOffset)

        return () => {
            window.removeEventListener('resize', updateOffset)
        }
    }, [])

    return state
}

export default useOffsetListener
