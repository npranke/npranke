import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount } from 'enzyme'
import React from 'react'
import { act, render } from '@testing-library/react'

import ComponentUseOffsetListenerMock from
    '@__mocks__/ComponentUseOffsetListenerMock'

Enzyme.configure({ adapter: new Adapter() })

describe('OffsetListener', () => {
    let component

    afterEach(() => {
        component.unmount()
    })

    describe('without elementRef.current', () => {
        beforeEach(() => {
            component = mount(
                <ComponentUseOffsetListenerMock elementRef={ {} } />,
            )
        })

        test('sets initial height to 0', () => {
            expect(
                component.find('.height').text(),
            ).toEqual('0')
        })

        test('sets initial width to 0', () => {
            expect(
                component.find('.width').text(),
            ).toEqual('0')
        })

        test('sets height on resize with offset height value', () => {
            act(() => {
                component.setProps({
                    elementRef: {
                        current: {
                            offsetHeight: 50,
                            offsetWidth: 75,
                        },
                    },
                })

                window.dispatchEvent(new Event('resize'))
            })

            expect(
                component.find('.height').text(),
            ).toEqual('50')
        })

        test('sets width on resize with offset width value', () => {
            act(() => {
                component.setProps({
                    elementRef: {
                        current: {
                            offsetHeight: 50,
                            offsetWidth: 75,
                        },
                    },
                })

                window.dispatchEvent(new Event('resize'))
            })

            expect(
                component.find('.width').text(),
            ).toEqual('75')
        })
    })

    describe('with elementRef.current', () => {
        beforeEach(() => {
            component = mount(
                <ComponentUseOffsetListenerMock
                    elementRef={ {
                        current: {
                            offsetHeight: 25,
                            offsetWidth: 100,
                        },
                    } }
                />,
            )
        })

        test('sets initial height to height value', () => {
            expect(
                component.find('.height').text(),
            ).toEqual('25')
        })

        test('sets initial width to width value', () => {
            expect(
                component.find('.width').text(),
            ).toEqual('100')
        })

        test('sets height on resize with offset height value', () => {
            act(() => {
                component.setProps({
                    elementRef: {
                        current: {
                            offsetHeight: 50,
                            offsetWidth: 75,
                        },
                    },
                })

                window.dispatchEvent(new Event('resize'))
            })

            expect(
                component.find('.height').text(),
            ).toEqual('50')
        })

        test('sets width on resize with offset width value', () => {
            act(() => {
                component.setProps({
                    elementRef: {
                        current: {
                            offsetHeight: 50,
                            offsetWidth: 75,
                        },
                    },
                })

                window.dispatchEvent(new Event('resize'))
            })

            expect(
                component.find('.width').text(),
            ).toEqual('75')
        })
    })
})

describe('OffsetListener snapshot', () => {
    test('matches snapshot without elementRef.current', () => {
        const { asFragment } = render(
            <ComponentUseOffsetListenerMock
                elementRef={ {} }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    test('matches snapshot with elementRef.current', () => {
        const { asFragment } = render(
            <ComponentUseOffsetListenerMock
                elementRef={ {
                    current: {
                        offsetHeight: 25,
                        offsetWidth: 100,
                    },
                } }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
