import { act } from 'react-dom/test-utils'
import Adapter from 'enzyme-adapter-react-16'
import { advanceBy, advanceTo, clear } from 'jest-date-mock'
import Enzyme, { mount } from 'enzyme'
import React from 'react'

import ComponentUseTimeRunnerMock from '@__mocks__/ComponentUseTimeRunnerMock'

Enzyme.configure({ adapter: new Adapter() })

describe('TimeRunner', () => {
    let component

    beforeEach(() => {
        jest.useFakeTimers()
        advanceTo(0)
        component = mount(<ComponentUseTimeRunnerMock />)
    })

    afterEach(() => {
        component.unmount()
        clear()
        jest.clearAllTimers()
    })

    test('return time 00 when isTimeRunning false', () => {
        act(() => {
            component.setProps({ isTimeRunning: false })

            for (let i = 0; i < 10; i++) {
                jest.advanceTimersByTime(10)
                advanceBy(10)
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
                { isTimeRunning: true, shouldReset: true },
            )

            for (let i = 0; i < 10; i++) {
                jest.advanceTimersByTime(10)
                advanceBy(10)
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
            component.setProps({ isTimeRunning: true })

            for (let i = 0; i < 6; i++) {
                jest.advanceTimersByTime(10)
                advanceBy(10)
            }
        })

        expect(
            component.find('.centiseconds').text(),
        ).toEqual('05')
    })

    test('formats seconds when less than 10', () => {
        act(() => {
            component.setProps({ isTimeRunning: true })

            for (let i = 0; i < 820; i++) {
                jest.advanceTimersByTime(10)
                advanceBy(10)
            }
        })

        expect(
            component.find('.seconds').text(),
        ).toEqual('08')
    })

    test('formats minutes when less than 10', () => {
        act(() => {
            component.setProps({ isTimeRunning: true })

            for (let i = 0; i < 12400; i++) {
                jest.advanceTimersByTime(10)
                advanceBy(10)
            }
        })

        expect(
            component.find('.minutes').text(),
        ).toEqual('02')
    })

    test('formats centiseconds when over 100', () => {
        act(() => {
            component.setProps({ isTimeRunning: true })

            for (let i = 0; i < 105; i++) {
                jest.advanceTimersByTime(10)
                advanceBy(10)
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
            component.setProps({ isTimeRunning: true })

            for (let i = 0; i < 6300; i++) {
                jest.advanceTimersByTime(10)
                advanceBy(10)
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
        test('setInterval called with isTimeRunning change', () => {
            window.setInterval = jest.fn()

            act(() => {
                component.setProps({ isTimeRunning: true })
            })

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(1)

            act(() => {
                component.setProps({ isTimeRunning: false })
            })

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(2)
        })

        test('setInterval not called without isTimeRunning change', () => {
            window.setInterval = jest.fn()

            act(() => {
                component.setProps({ isTimeRunning: false })
            })

            expect(
                window.setInterval,
            ).toHaveBeenCalledTimes(0)

            act(() => {
                component.setProps({ isTimeRunning: false })
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
        const component = mount(<ComponentUseTimeRunnerMock />)

        expect(component).toMatchSnapshot()
    })
})
