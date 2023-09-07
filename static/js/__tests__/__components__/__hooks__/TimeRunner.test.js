import { act, render, screen } from '@testing-library/react'

import ComponentUseTimeRunnerMock from '@__mocks__/ComponentUseTimeRunnerMock'

jest.useFakeTimers()

describe('TimeRunner', () => {
    beforeEach(() => {
        jest.setSystemTime(0)
    })

    test('return time 00 when isRunning false', () => {
        render(
            <ComponentUseTimeRunnerMock
                isRunning={ false }
                shouldReset={ false }
            />,
        )

        act(() => {
            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(100)
        })

        expect(
            screen.getByTestId('centiseconds-div-elem').textContent,
        ).toEqual('00')
        expect(
            screen.getByTestId('seconds-div-elem').textContent,
        ).toEqual('00')
        expect(
            screen.getByTestId('minutes-div-elem').textContent,
        ).toEqual('00')
    })

    test('return time 00 when shouldReset true', () => {
        render(
            <ComponentUseTimeRunnerMock
                isRunning
                shouldReset
            />,
        )

        act(() => {
            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(100)
        })

        expect(
            screen.getByTestId('centiseconds-div-elem').textContent,
        ).toEqual('00')
        expect(
            screen.getByTestId('seconds-div-elem').textContent,
        ).toEqual('00')
        expect(
            screen.getByTestId('minutes-div-elem').textContent,
        ).toEqual('00')
    })

    test('formats centiseconds when less than 10', () => {
        render(
            <ComponentUseTimeRunnerMock
                isRunning
                shouldReset={ false }
            />,
        )

        act(() => {
            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(60)
        })

        expect(
            screen.getByTestId('centiseconds-div-elem').textContent,
        ).toEqual('05')
    })

    test('formats seconds when less than 10', () => {
        render(
            <ComponentUseTimeRunnerMock
                isRunning
                shouldReset={ false }
            />,
        )

        act(() => {
            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(8200)
        })

        expect(
            screen.getByTestId('seconds-div-elem').textContent,
        ).toEqual('08')
    })

    test('formats minutes when less than 10', () => {
        render(
            <ComponentUseTimeRunnerMock
                isRunning
                shouldReset={ false }
            />,
        )

        act(() => {
            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(124000)
        })

        expect(
            screen.getByTestId('minutes-div-elem').textContent,
        ).toEqual('02')
    })

    test('formats centiseconds when over 100', () => {
        render(
            <ComponentUseTimeRunnerMock
                isRunning
                shouldReset={ false }
            />,
        )

        act(() => {
            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(1050)
        })

        expect(
            screen.getByTestId('centiseconds-div-elem').textContent,
        ).toEqual('04')
        expect(
            screen.getByTestId('seconds-div-elem').textContent,
        ).toEqual('01')
    })

    test('formats seconds when over 60', () => {
        render(
            <ComponentUseTimeRunnerMock
                isRunning
                shouldReset={ false }
            />,
        )

        act(() => {
            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(63000)
        })

        expect(
            screen.getByTestId('seconds-div-elem').textContent,
        ).toEqual('02')
        expect(
            screen.getByTestId('minutes-div-elem').textContent,
        ).toEqual('01')
    })

    describe('useEffect dependency changes', () => {
        beforeAll(() => {
            jest.spyOn(window, 'setInterval')
        })

        beforeEach(() => {
            jest.clearAllMocks()
        })

        afterAll(() => {
            jest.restoreAllMocks()
        })

        test('setInterval called again with isRunning change', () => {
            const { rerender } = render(
                <ComponentUseTimeRunnerMock
                    isRunning={ false }
                    shouldReset={ false }
                />,
            )

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(1)

            rerender(
                <ComponentUseTimeRunnerMock
                    isRunning
                    shouldReset={ false }
                />,
            )

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(2)

            rerender(
                <ComponentUseTimeRunnerMock
                    isRunning={ false }
                    shouldReset={ false }
                />,
            )

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(3)
        })

        test('setInterval not called again without isRunning change', () => {
            const { rerender } = render(
                <ComponentUseTimeRunnerMock
                    isRunning={ false }
                    shouldReset={ false }
                />,
            )

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(1)

            rerender(
                <ComponentUseTimeRunnerMock
                    isRunning={ false }
                    shouldReset={ false }
                />,
            )

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(1)
        })

        test('setInterval called again with shouldReset change', () => {
            const { rerender } = render(
                <ComponentUseTimeRunnerMock
                    isRunning={ false }
                    shouldReset={ false }
                />,
            )

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(1)

            rerender(
                <ComponentUseTimeRunnerMock
                    isRunning={ false }
                    shouldReset
                />,
            )

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(2)

            rerender(
                <ComponentUseTimeRunnerMock
                    isRunning={ false }
                    shouldReset={ false }
                />,
            )

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(3)
        })

        test('setInterval not called again without shouldReset change', () => {
            const { rerender } = render(
                <ComponentUseTimeRunnerMock
                    isRunning={ false }
                    shouldReset={ false }
                />,
            )

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(1)

            rerender(
                <ComponentUseTimeRunnerMock
                    isRunning={ false }
                    shouldReset={ false }
                />,
            )

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(1)
        })
    })
})

describe('TimeRunner snapshot', () => {
    test('matches snapshot without time runing', () => {
        const { asFragment } = render(
            <ComponentUseTimeRunnerMock
                isRunning={ false }
                shouldReset={ false }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    test('matches snapshot with time run to 02:36:19', () => {
        const { asFragment, rerender } = render(
            <ComponentUseTimeRunnerMock
                isRunning
                shouldReset={ false }
            />,
        )

        act(() => {
            jest.setSystemTime(0)
            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(156200)
        })

        rerender(<ComponentUseTimeRunnerMock />)

        expect(asFragment()).toMatchSnapshot()
    })
})
