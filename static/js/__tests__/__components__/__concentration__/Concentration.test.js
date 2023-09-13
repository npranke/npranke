import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Concentration } from '@components/concentration/Concentration'
import * as rowModule from '@components/concentration/ConcentrationBoardRow'

import * as utils from '@utils'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('@components/concentration/ConcentrationBoardRow', () => {
    return {
        __esModule: true,
        default: jest.requireActual(
            '@components/concentration/ConcentrationBoardRow',
        ).default,
    }
})

jest.useFakeTimers()

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

    test('time starts running when a picture is clicked', async () => {
        const user = userEvent.setup({
            advanceTimers: jest.advanceTimersByTime,
        })

        render(<Concentration />)

        const times = screen.getAllByRole('timer')
        const pictures = screen.getAllByRole(
            'button',
            { name: 'NASA/JPL Mars Exploration Rover PIA20285' },
        )

        await user.click(pictures[0])

        act(() => {
            jest.runOnlyPendingTimers()
            jest.advanceTimersByTime(50)
        })

        expect(
            times[0].textContent,
        ).toEqual('00')
        expect(
            times[1].textContent,
        ).toEqual('00')
        expect(
            times[2].textContent,
        ).toEqual('04')
    })

    describe('sending concentration events', () => {
        beforeAll(() => {
            utils.getSendEventHandler = jest.spyOn(
                utils,
                'getSendEventHandler',
            )
            utils.sendEvent = jest.spyOn(utils, 'sendEvent')
        })

        afterEach(() => {
            utils.getSendEventHandler.mockClear()
            utils.sendEvent.mockClear()
        })

        afterAll(() => {
            utils.getSendEventHandler.mockRestore()
            utils.sendEvent.mockRestore()
        })

        test('when picture is clicked', async () => {
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            })

            render(<Concentration />)

            const pictures = screen.getAllByRole(
                'button',
                { name: 'NASA/JPL Mars Exploration Rover PIA20285' },
            )

            await user.click(pictures[0])

            expect(utils.sendEvent).toHaveBeenCalledTimes(1)
            expect(
                utils.sendEvent,
            ).toHaveBeenNthCalledWith(
                1,
                'concentration',
                'click',
                'picture',
            )
        })

        test('when match is clicked', async () => {
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            })

            render(<Concentration />)

            const pictures = screen.getAllByRole(
                'button',
                { name: 'NASA/JPL Mars Exploration Rover PIA20285' },
            )

            const pair = pictures.filter((picture) => {
                return picture.getAttribute('data-pictureid') === '4'
            })

            await user.click(pair[0])
            await user.click(pair[1])

            expect(utils.sendEvent).toHaveBeenCalledTimes(3)
            expect(
                utils.sendEvent,
            ).toHaveBeenNthCalledWith(
                3,
                'concentration',
                'find',
                'match',
            )
        })

        test('when last match is clicked', async () => {
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            })

            render(<Concentration />)

            const pictures = screen.getAllByRole(
                'button',
                { name: 'NASA/JPL Mars Exploration Rover PIA20285' },
            )

            let pair

            for (let i = 0; i < 12; i++) {
                pair = pictures.filter((picture) => {
                    return picture.getAttribute(
                        'data-pictureid',
                    ) === i.toString()
                })

                if (i < 11) {
                    await user.click(pair[0])
                    await user.click(pair[1])
                }
            }

            expect(utils.sendEvent).toHaveBeenCalledTimes(33)

            await user.click(pair[0])

            expect(utils.sendEvent).toHaveBeenCalledTimes(34)

            await user.click(pair[1])

            expect(utils.sendEvent).toHaveBeenCalledTimes(37)
            expect(
                utils.sendEvent,
            ).toHaveBeenNthCalledWith(
                37,
                'concentration',
                'complete',
                'matches',
                12,
            )
        })

        test('with getSendEventHandler for matches picture', () => {
            shallow(<Concentration />)

            expect(
                utils.getSendEventHandler,
            ).toHaveBeenCalledTimes(12)
            expect(
                utils.getSendEventHandler,
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

        test('sets isTimeRunning to false when last match', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '11-a', pictureid: '11' },
                internalMatches: Array.from(
                    { length: 11 },
                    (value, index) => {
                        return `${index}`
                    },
                ),
                isTimeRunning: true,
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '11-b',
                        pictureid: '11',
                    },
                },
            })

            expect(
                concentration.state('isTimeRunning'),
            ).toBe(false)
        })

        test('sets isTimeRunning to true when not last match', () => {
            const concentration = shallow(<Concentration />)

            concentration.setState({
                first: { id: '6-a', pictureid: '6' },
                internalMatches: ['0', '1', '2', '3', '4', '5'],
            })

            concentration.instance().pictureClickHandler({
                currentTarget: {
                    dataset: {
                        id: '6-b',
                        pictureid: '6',
                    },
                },
            })

            expect(
                concentration.state('isTimeRunning'),
            ).toBe(true)
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
                    (value, index) => {
                        return `${index}`
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
        test('calls pictureClickHandler() on enter', async () => {
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            })

            render(<Concentration />)

            const picture = screen.getAllByRole(
                'button',
                { name: 'NASA/JPL Mars Exploration Rover PIA20285' },
            )[0]

            picture.focus()
            await user.keyboard('{Enter}')

            expect(
                picture,
            ).not.toHaveAttribute(
                'name',
                'NASA/JPL Mars Exploration Rover PIA20285',
            )
            expect(picture).not.toHaveAttribute('name', '')
            expect(picture).toHaveClass('picture-front')
        })

        test('calls pictureClickHandler() on spacebar', async () => {
            const user = userEvent.setup({
                advanceTimers: jest.advanceTimersByTime,
            })

            render(<Concentration />)

            const picture = screen.getAllByRole(
                'button',
                { name: 'NASA/JPL Mars Exploration Rover PIA20285' },
            )[0]

            picture.focus()
            await user.keyboard(' ')

            expect(
                picture,
            ).not.toHaveAttribute(
                'name',
                'NASA/JPL Mars Exploration Rover PIA20285',
            )
            expect(picture).not.toHaveAttribute('name', '')
            expect(picture).toHaveClass('picture-front')
        })
    })
})

describe('Concentration snapshot', () => {
    beforeAll(() => {
        rowModule.default = () => {
            return (<div className="board-row"></div>)
        }
    })

    test('matches snapshot', () => {
        const { asFragment } = render(<Concentration />)

        expect(asFragment()).toMatchSnapshot()
    })
})
