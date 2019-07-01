import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount, shallow } from 'enzyme'
import React from 'react'

import { Concentration } from '@components/concentration/Concentration'

import { getSendEventHandler, sendEvent } from '@utils'

jest.mock('@utils')

Enzyme.configure({ adapter: new Adapter() })

describe('Concentration', () => {
    test('has matches section', () => {
        const concentration = shallow(<Concentration />)

        expect(
            concentration.find(
                '.concentration .matches-wrapper ConcentrationMatches',
            ).exists(),
        ).toBe(true)
    })

    test('has board section', () => {
        const concentration = shallow(<Concentration />)

        expect(
            concentration.find(
                '.concentration .board-wrapper ConcentrationBoard',
            ).exists(),
        ).toBe(true)
    })

    test('matchesPictures has 12 pictures', () => {
        const concentration = shallow(<Concentration />)

        expect(
            Object.keys(concentration.instance().matchesPictures),
        ).toHaveLength(12)
    })

    test('boardPictures has 24 pictures', () => {
        const concentration = shallow(<Concentration />)

        expect(
            Object.keys(concentration.instance().boardPictures),
        ).toHaveLength(24)
    })

    test('boardOrder has 24 picture names', () => {
        const concentration = shallow(<Concentration />)

        expect(
            concentration.instance().boardOrder,
        ).toHaveLength(24)
    })

    test('boardOrder is shuffled', () => {
        const concentration = shallow(<Concentration />)

        const exactOrder = Object.keys(
            concentration.instance().boardPictures,
        )

        let exactOrderMatches = 0
        concentration.instance().boardOrder.forEach((pictureName, index) => {
            if (pictureName === exactOrder[index]) {
                exactOrderMatches += 1
            }
        })

        expect(
            exactOrderMatches,
        ).toBeLessThan(24)
    })

    test('time starts running when a picture is clicked', () => {
        const concentration = mount(<Concentration />)

        concentration.find('.picture-back').first().simulate('click')

        expect(
            concentration.state('isTimeRunning'),
        ).toBe(true)
    })

    describe('sending concentration events', () => {
        afterEach(() => {
            getSendEventHandler.mockReset()
            sendEvent.mockReset()
        })

        test('when picture is clicked', () => {
            const concentration = mount(<Concentration />)

            concentration.find('.picture-back').first().simulate('click')

            expect(
                sendEvent,
            ).toHaveBeenNthCalledWith(
                1,
                'concentration',
                'click',
                'picture',
            )
        })

        test('when match is clicked', () => {
            const concentration = mount(<Concentration />)

            const pictureid = concentration.find(
                '.picture-back',
            ).first().props()['data-pictureid']

            concentration.setState({
                first: {
                    id: `${pictureid}-x`,
                    pictureid,
                },
            })

            concentration.find('.picture-back').first().simulate('click')

            expect(
                sendEvent,
            ).toHaveBeenNthCalledWith(
                2,
                'concentration',
                'find',
                'match',
            )
        })

        test('when matches picture is clicked', () => {
            mount(<Concentration />)

            expect(
                getSendEventHandler,
            ).toHaveBeenCalledTimes(12)
            expect(
                getSendEventHandler,
            ).toHaveBeenNthCalledWith(
                1,
                'concentration',
                'navigate',
                'PIA22332',
            )
        })
    })

    describe('pictureClickHandler()', () => {
        test('sets first when first is null', () => {
            const concentration = shallow(<Concentration />)

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '2-b',
                        pictureid: '2',
                    },
                },
            })

            expect(
                concentration.state('first'),
            ).toEqual({ id: '2-b', pictureid: '2' })
        })

        test('sets second and internalMatches when match', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '2-b', pictureid: '2' },
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '2-a',
                        pictureid: '2',
                    },
                },
            })

            expect(
                concentration.state('second'),
            ).toEqual({ id: '2-a', pictureid: '2' })
            expect(
                concentration.state('internalMatches'),
            ).toEqual(['2'])
        })

        test('sets pictureTimeout when match', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '9-a', pictureid: '9' },
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '9-b',
                        pictureid: '9',
                    },
                },
            })

            expect(
                concentration.instance().pictureTimeout,
            ).toBeDefined()
        })

        test('pictureTimeout resets first and second when match', () => {
            jest.useFakeTimers()

            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '6-a', pictureid: '6' },
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '6-b',
                        pictureid: '6',
                    },
                },
            })

            jest.advanceTimersByTime(1000)

            expect(
                concentration.state('first'),
            ).toEqual({ id: null, pictureid: null })
            expect(
                concentration.state('second'),
            ).toEqual({ id: null, pictureid: null })
        })

        test('increments turns when match', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '5-a', pictureid: '5' },
                turns: 3,
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '5-b',
                        pictureid: '5',
                    },
                },
            })

            expect(
                concentration.state('turns'),
            ).toEqual(4)
        })

        test('pictureTimeout sets displayedMatches when match', () => {
            jest.useFakeTimers()

            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '2-b', pictureid: '2' },
                displayedMatches: ['5', '9'],
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '2-a',
                        pictureid: '2',
                    },
                },
            })

            jest.advanceTimersByTime(1000)

            expect(
                concentration.state('displayedMatches'),
            ).toEqual(['5', '9', '2'])
        })

        test('sets second and not internalMatches when not match', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '11-a', pictureid: '11' },
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '5-a',
                        pictureid: '5',
                    },
                },
            })

            expect(
                concentration.state('second'),
            ).toEqual({ id: '5-a', pictureid: '5' })
            expect(
                concentration.state('internalMatches'),
            ).toEqual([])
        })

        test('sets pictureTimeout when not match', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '8-b', pictureid: '8' },
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '10-b',
                        pictureid: '10',
                    },
                },
            })

            expect(
                concentration.instance().pictureTimeout,
            ).toBeDefined()
        })

        test('pictureTimeout resets first and second when not match', () => {
            jest.useFakeTimers()

            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '10-a', pictureid: '10' },
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '11-b',
                        pictureid: '11',
                    },
                },
            })

            jest.advanceTimersByTime(2000)

            expect(
                concentration.state('first'),
            ).toEqual({ id: null, pictureid: null })
            expect(
                concentration.state('second'),
            ).toEqual({ id: null, pictureid: null })
        })

        test('pictureTimeout sets displayedMatches when not match', () => {
            jest.useFakeTimers()

            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '5-b', pictureid: '5' },
                internalMatches: ['4', '11'],
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '6-a',
                        pictureid: '6',
                    },
                },
            })

            jest.advanceTimersByTime(2000)

            expect(
                concentration.state('displayedMatches'),
            ).toEqual(['4', '11'])
        })

        test('increments turns when not match', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '5-b', pictureid: '5' },
                turns: 5,
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '7-a',
                        pictureid: '7',
                    },
                },
            })

            expect(
                concentration.state('turns'),
            ).toEqual(6)
        })

        test('sets first and resets second when new picture', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '3-b', pictureid: '3' },
                second: { id: '7-b', pictureid: '7' },
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '0-a',
                        pictureid: '0',
                    },
                },
            })

            expect(
                concentration.state('first'),
            ).toEqual({ id: '0-a', pictureid: '0' })
            expect(
                concentration.state('second'),
            ).toEqual({ id: null, pictureid: null })
        })


        test('clears pictureTimeout when new picture', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '3-a', pictureid: '3' },
                second: { id: '3-b', pictureid: '3' },
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '0-b',
                        pictureid: '0',
                    },
                },
            })

            expect(
                concentration.instance().pictureTimeout,
            ).toBeUndefined()
        })

        test('sets displayedMatches and isTimeRunning', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                internalMatches: Array.from(
                    { length: 4 },
                    (value, integer) => {
                        return `${integer}`
                    },
                ),
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '7-a',
                        pictureid: '7',
                    },
                },
            })

            expect(
                concentration.state('displayedMatches'),
            ).toEqual(['0', '1', '2', '3'])
            expect(
                concentration.state('isTimeRunning'),
            ).toBe(true)
        })
    })

    describe('pictureKeyUpHandler()', () => {
        test('calls pictureClickHandler() on enter', () => {
            const concentration = mount(<Concentration />)

            concentration.instance().pictureClickHandler = jest.fn()

            concentration.find('.picture-back').first().simulate(
                'keyup',
                { key: 'Enter' },
            )

            expect(
                concentration.instance().pictureClickHandler,
            ).toHaveBeenCalled()
        })

        test('calls pictureClickHandler() on spacebar', () => {
            const concentration = mount(<Concentration />)

            concentration.instance().pictureClickHandler = jest.fn()

            concentration.find('.picture-back').first().simulate(
                'keyup',
                { key: ' ' },
            )

            expect(
                concentration.instance().pictureClickHandler,
            ).toHaveBeenCalled()
        })
    })

    describe('updateTime()', () => {
        test('stops time running when matches is 12', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                isTimeRunning: true,
                internalMatches: Array.from(
                    { length: 12 },
                    (value, integer) => {
                        return `${integer}`
                    },
                ),
            })

            concentration.instance().updateTime()

            expect(
                concentration.state('isTimeRunning'),
            ).toBe(false)
        })

        test('formats time when centiseconds is less than 10', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({ isTimeRunning: true, centiseconds: '5' })

            concentration.instance().updateTime()

            expect(
                concentration.state('centiseconds'),
            ).toEqual('06')
        })

        test('formats time when seconds is less than 10', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({ isTimeRunning: true, seconds: '8' })

            concentration.instance().updateTime()

            expect(
                concentration.state('seconds'),
            ).toEqual('08')
        })

        test('formats time when minutes is less than 10', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({ isTimeRunning: true, minutes: '2' })

            concentration.instance().updateTime()

            expect(
                concentration.state('minutes'),
            ).toEqual('02')
        })

        test('formats time when centiseconds is over 100', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                isTimeRunning: true,
                centiseconds: '103',
            })

            concentration.instance().updateTime()

            expect(
                concentration.state('centiseconds'),
            ).toEqual('04')
            expect(
                concentration.state('seconds'),
            ).toEqual('01')
        })

        test('formats time when seconds is over 60', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({ isTimeRunning: true, seconds: '61' })

            concentration.instance().updateTime()

            expect(
                concentration.state('seconds'),
            ).toEqual('01')
            expect(
                concentration.state('minutes'),
            ).toEqual('01')
        })
    })
})

describe('Concentration snapshot', () => {
    test('matches snapshot', () => {
        const concentration = shallow(<Concentration />)

        concentration.instance().boardOrder = [
            'picture0-a',
            'picture0-b',
            'picture1-a',
            'picture1-b',
            'picture2-a',
            'picture2-b',
            'picture3-a',
            'picture3-b',
            'picture4-a',
            'picture4-b',
            'picture5-a',
            'picture5-b',
            'picture6-a',
            'picture6-b',
            'picture7-a',
            'picture7-b',
            'picture8-a',
            'picture8-b',
            'picture9-a',
            'picture9-b',
            'picture10-a',
            'picture10-b',
            'picture11-a',
            'picture11-b',
        ]

        expect(concentration.instance().render()).toMatchSnapshot()
    })
})
