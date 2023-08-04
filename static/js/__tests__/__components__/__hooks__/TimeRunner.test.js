import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

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

            for (let i = 0; i < 10; i++) {
                jest.advanceTimersByTime(10)
            }
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

            for (let i = 0; i < 10; i++) {
                jest.advanceTimersByTime(10)
            }
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

            for (let i = 0; i < 6; i++) {
                jest.advanceTimersByTime(10)
            }
        })

        expect(
            component.find('.centiseconds').text(),
        ).toEqual('05')
    })

    test('formats seconds when less than 10', () => {
        act(() => {
            component.setProps({ isRunning: true })
            jest.runOnlyPendingTimers()

            for (let i = 0; i < 820; i++) {
                jest.advanceTimersByTime(10)
            }
        })

        expect(
            component.find('.seconds').text(),
        ).toEqual('08')
    })

    test('formats minutes when less than 10', () => {
        act(() => {
            component.setProps({ isRunning: true })
            jest.runOnlyPendingTimers()

            for (let i = 0; i < 12400; i++) {
                jest.advanceTimersByTime(10)
            }
        })

        expect(
            component.find('.minutes').text(),
        ).toEqual('02')
    })

    test('formats centiseconds when over 100', () => {
        act(() => {
            component.setProps({ isRunning: true })
            jest.runOnlyPendingTimers()

            for (let i = 0; i < 105; i++) {
                jest.advanceTimersByTime(10)
            }
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

            for (let i = 0; i < 6300; i++) {
                jest.advanceTimersByTime(10)
            }
        })

        expect(
            component.find('.seconds').text(),
        ).toEqual('02')
        expect(
            component.find('.minutes').text(),
        ).toEqual('01')
    })

    describe('useEffect dependency changes', () => {
        test('setInterval called with isRunning change', () => {
            window.setInterval = jest.fn()

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
            window.setInterval = jest.fn()

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
            window.setInterval = jest.fn()

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
            window.setInterval = jest.fn()

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
    test('matches snapshot', () => {
        const component = renderer.create(
            <ComponentUseTimeRunnerMock
                isRunning={ false }
                shouldReset={ false }
            />,
        ).toJSON()

        expect(component).toMatchSnapshot()
    })
})
