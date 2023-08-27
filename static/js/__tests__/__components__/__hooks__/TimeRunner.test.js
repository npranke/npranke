import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount } from 'enzyme'
import { act, render } from '@testing-library/react'

import ComponentUseTimeRunnerMock from '@__mocks__/ComponentUseTimeRunnerMock'

Enzyme.configure({ adapter: new Adapter() })

jest.useFakeTimers()

describe('TimeRunner', () => {
    let component

    beforeEach(() => {
        jest.setSystemTime(0)
        component = mount(
            <ComponentUseTimeRunnerMock
                isRunning={ false }
                shouldReset={ false }
            />,
        )
    })

    afterEach(() => {
        component.unmount()
    })

    test('return time 00 when isRunning false', () => {
        act(() => {
            component.setProps({ isRunning: false })

            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(100)
        })

        expect(
            component.find('.centiseconds').text(),
        ).toEqual('00')
        expect(
            component.find('.seconds').text(),
        ).toEqual('00')
        expect(
            component.find('.minutes').text(),
        ).toEqual('00')
    })

    test('return time 00 when shouldReset true', () => {
        act(() => {
            component.setProps(
                { isRunning: true, shouldReset: true },
            )

            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(100)
        })

        expect(
            component.find('.centiseconds').text(),
        ).toEqual('00')
        expect(
            component.find('.seconds').text(),
        ).toEqual('00')
        expect(
            component.find('.minutes').text(),
        ).toEqual('00')
    })

    test('formats centiseconds when less than 10', () => {
        act(() => {
            component.setProps({ isRunning: true })

            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(60)
        })

        expect(
            component.find('.centiseconds').text(),
        ).toEqual('05')
    })

    test('formats seconds when less than 10', () => {
        act(() => {
            component.setProps({ isRunning: true })

            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(8200)
        })

        expect(
            component.find('.seconds').text(),
        ).toEqual('08')
    })

    test('formats minutes when less than 10', () => {
        act(() => {
            component.setProps({ isRunning: true })

            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(124000)
        })

        expect(
            component.find('.minutes').text(),
        ).toEqual('02')
    })

    test('formats centiseconds when over 100', () => {
        act(() => {
            component.setProps({ isRunning: true })

            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(1050)
        })

        expect(
            component.find('.centiseconds').text(),
        ).toEqual('04')
        expect(
            component.find('.seconds').text(),
        ).toEqual('01')
    })

    test('formats seconds when over 60', () => {
        act(() => {
            component.setProps({ isRunning: true })

            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(63000)
        })

        expect(
            component.find('.seconds').text(),
        ).toEqual('02')
        expect(
            component.find('.minutes').text(),
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

        test('setInterval called with isRunning change', () => {
            act(() => {
                component.setProps({ isRunning: true })
            })

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(1)

            act(() => {
                component.setProps({ isRunning: false })
            })

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(2)
        })

        test('setInterval not called without isRunning change', () => {
            act(() => {
                component.setProps({ isRunning: false })
            })

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(0)

            act(() => {
                component.setProps({ isRunning: false })
            })

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(0)
        })

        test('setInterval called with shouldReset change', () => {
            act(() => {
                component.setProps({ shouldReset: true })
            })

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(1)

            act(() => {
                component.setProps({ shouldReset: false })
            })

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(2)
        })

        test('setInterval not called without shouldReset change', () => {
            act(() => {
                component.setProps({ shouldReset: false })
            })

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(0)

            act(() => {
                component.setProps({ shouldReset: false })
            })

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(0)
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

            rerender(<ComponentUseTimeRunnerMock />)
        })

        expect(asFragment()).toMatchSnapshot()
    })
})
