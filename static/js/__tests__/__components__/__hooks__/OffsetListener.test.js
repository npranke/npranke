import { fireEvent, render, screen } from '@testing-library/react'

import ComponentUseOffsetListenerMock from
    '@__mocks__/ComponentUseOffsetListenerMock'

describe('OffsetListener', () => {
    describe('without elementRef.current', () => {
        test('sets initial height to 0', () => {
            render(
                <ComponentUseOffsetListenerMock elementRef={ {} } />,
            )

            expect(
                screen.getByTestId('height-div-elem').textContent,
            ).toEqual('0')
        })

        test('sets initial width to 0', () => {
            render(
                <ComponentUseOffsetListenerMock elementRef={ {} } />,
            )

            expect(
                screen.getByTestId('width-div-elem').textContent,
            ).toEqual('0')
        })

        test('sets height on resize with offset height value', () => {
            const { rerender } = render(
                <ComponentUseOffsetListenerMock elementRef={ {} } />,
            )

            rerender(
                <ComponentUseOffsetListenerMock
                    elementRef={ {
                        current: {
                            offsetHeight: 50,
                            offsetWidth: 75,
                        },
                    } }
                />,
            )

            expect(
                screen.getByTestId('height-div-elem').textContent,
            ).toEqual('0')

            fireEvent(window, new Event('resize'))

            expect(
                screen.getByTestId('height-div-elem').textContent,
            ).toEqual('50')
        })

        test('sets width on resize with offset width value', () => {
            const { rerender } = render(
                <ComponentUseOffsetListenerMock elementRef={ {} } />,
            )

            rerender(
                <ComponentUseOffsetListenerMock
                    elementRef={ {
                        current: {
                            offsetHeight: 50,
                            offsetWidth: 75,
                        },
                    } }
                />,
            )

            expect(
                screen.getByTestId('width-div-elem').textContent,
            ).toEqual('0')

            fireEvent(window, new Event('resize'))

            expect(
                screen.getByTestId('width-div-elem').textContent,
            ).toEqual('75')
        })
    })

    describe('with elementRef.current', () => {
        test('sets initial height to height value', () => {
            render(
                <ComponentUseOffsetListenerMock
                    elementRef={ {
                        current: {
                            offsetHeight: 25,
                            offsetWidth: 100,
                        },
                    } }
                />,
            )

            expect(
                screen.getByTestId('height-div-elem').textContent,
            ).toEqual('25')
        })

        test('sets initial width to width value', () => {
            render(
                <ComponentUseOffsetListenerMock
                    elementRef={ {
                        current: {
                            offsetHeight: 25,
                            offsetWidth: 100,
                        },
                    } }
                />,
            )

            expect(
                screen.getByTestId('width-div-elem').textContent,
            ).toEqual('100')
        })

        test('sets height on resize with offset height value', () => {
            const { rerender } = render(
                <ComponentUseOffsetListenerMock
                    elementRef={ {
                        current: {
                            offsetHeight: 25,
                            offsetWidth: 100,
                        },
                    } }
                />,
            )

            rerender(
                <ComponentUseOffsetListenerMock
                    elementRef={ {
                        current: {
                            offsetHeight: 50,
                            offsetWidth: 75,
                        },
                    } }
                />,
            )

            expect(
                screen.getByTestId('height-div-elem').textContent,
            ).toEqual('25')

            fireEvent(window, new Event('resize'))

            expect(
                screen.getByTestId('height-div-elem').textContent,
            ).toEqual('50')
        })

        test('sets width on resize with offset width value', () => {
            const { rerender } = render(
                <ComponentUseOffsetListenerMock
                    elementRef={ {
                        current: {
                            offsetHeight: 25,
                            offsetWidth: 100,
                        },
                    } }
                />,
            )

            rerender(
                <ComponentUseOffsetListenerMock
                    elementRef={ {
                        current: {
                            offsetHeight: 50,
                            offsetWidth: 75,
                        },
                    } }
                />,
            )

            expect(
                screen.getByTestId('width-div-elem').textContent,
            ).toEqual('100')

            fireEvent(window, new Event('resize'))

            expect(
                screen.getByTestId('width-div-elem').textContent,
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
