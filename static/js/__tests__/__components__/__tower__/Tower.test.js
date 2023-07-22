import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import { Tower } from '@components/tower/Tower'

import * as utils from '@utils'

Enzyme.configure({ adapter: new Adapter() })

describe('Tower', () => {
    test('has settings section', () => {
        const tower = shallow(<Tower />)

        expect(
            tower.find(
                '.tower .settings-wrapper TowerSettings',
            ).exists(),
        ).toBe(true)
    })

    test('has one locations container', () => {
        const tower = shallow(<Tower />)

        expect(
            tower.find(
                '.tower .locations-wrapper .locations-container',
            ).length,
        ).toBe(1)
    })

    test('has three location sections', () => {
        const tower = shallow(<Tower />)

        expect(
            tower.find(
                '.tower .location-wrapper TowerLocation',
            ).length,
        ).toBe(3)
    })

    describe('towers', () => {
        test('has four towers', () => {
            const tower = shallow(<Tower />)

            expect(
                Object.keys(tower.instance().towers),
            ).toHaveLength(4)
        })

        test('each tower has link', () => {
            const tower = shallow(<Tower />)
            const { towers } = tower.instance()

            Object.keys(towers).forEach((towerKey) => {
                expect(
                    towers[towerKey],
                ).toHaveProperty('link', expect.any(String))
            })
        })

        test('each tower has clickHandler', () => {
            const tower = shallow(<Tower />)
            const { towers } = tower.instance()

            Object.keys(towers).forEach((towerKey) => {
                expect(
                    towers[towerKey],
                ).toHaveProperty('clickHandler', expect.any(Function))
            })
        })

        test('each tower has landscape disks', () => {
            const tower = shallow(<Tower />)
            const { towers } = tower.instance()

            Object.keys(towers).forEach((towerKey) => {
                expect(
                    towers[towerKey],
                ).toHaveProperty('landscape', expect.any(Array))
                expect(
                    towers[towerKey].landscape.length,
                ).toBe(parseInt(towerKey, 10))

                towers[towerKey].landscape.forEach((disk) => {
                    expect(
                        parseInt(disk.diskid, 10),
                    ).toBeLessThan(parseInt(towerKey, 10) + 1)
                    expect(
                        disk.image,
                    ).toBeTruthy()
                })
            })
        })

        test('each tower has portrait disks', () => {
            const tower = shallow(<Tower />)
            const { towers } = tower.instance()

            Object.keys(towers).forEach((towerKey) => {
                expect(
                    towers[towerKey],
                ).toHaveProperty('portrait', expect.any(Array))
                expect(
                    towers[towerKey].landscape.length,
                ).toBe(parseInt(towerKey, 10))

                towers[towerKey].landscape.forEach((disk) => {
                    expect(
                        parseInt(disk.diskid, 10),
                    ).toBeLessThan(parseInt(towerKey, 10) + 1)
                    expect(
                        disk.image,
                    ).toBeTruthy()
                })
            })
        })
    })

    describe('originTimeout in component lifecycle', () => {
        beforeAll(() => {
            jest.useFakeTimers()

            window.clearTimeout = jest.spyOn(window, 'clearTimeout')
        })

        afterEach(() => {
            jest.clearAllTimers()

            window.clearTimeout.mockClear()
        })

        afterAll(() => {
            window.clearTimeout.mockRestore()
        })

        test('originTimeout is defined when component did mount', () => {
            const tower = shallow(<Tower />, { disableLifecycleMethods: true })

            expect(
                tower.instance().originTimeout,
            ).not.toBeDefined()

            tower.instance().componentDidMount()

            expect(
                tower.instance().originTimeout,
            ).toBeDefined()
        })

        test('originTimeout sets origin when component did mount', () => {
            const tower = shallow(<Tower />, { disableLifecycleMethods: true })

            expect(
                tower.state('origin'),
            ).toEqual([])

            tower.instance().componentDidMount()

            jest.advanceTimersByTime(400)

            expect(
                tower.state('origin'),
            ).toEqual(['3', '2', '1'])
        })

        test('originTimeout is cleared when component will unmount', () => {
            const tower = shallow(<Tower />)

            tower.instance().componentWillUnmount()

            expect(window.clearTimeout).toHaveBeenCalledTimes(1)
        })
    })

    describe('updateDisks()', () => {
        test('sets updated disks', () => {
            const tower = shallow(<Tower />)

            tower.instance().updateDisks('5')

            expect(
                tower.state('disks'),
            ).toBe(5)
        })

        test('sets originTimeout', () => {
            const tower = shallow(<Tower />)

            tower.instance().updateDisks('2')

            expect(
                tower.instance().originTimeout,
            ).toBeDefined()
        })

        test('originTimeout resets origin with updated diskids', () => {
            jest.useFakeTimers()

            const tower = shallow(<Tower />)

            tower.instance().updateDisks('4')

            jest.advanceTimersByTime(200)

            expect(
                tower.state('origin'),
            ).toEqual(['4', '3', '2', '1'])
        })
    })

    describe('moveDisk()', () => {
        test('moves disk when not completing tower', () => {
            const tower = shallow(<Tower />)

            tower.setState({
                isTimeRunning: true,
                moves: 2,
                disks: 3,
                origin: ['3'],
                buffer: ['2'],
                target: ['1'],
            })

            tower.instance().moveDisk('1', 'target', 'buffer')

            expect(tower.state()).toMatchObject({
                isComplete: false,
                isTimeRunning: true,
                moves: 3,
                origin: ['3'],
                buffer: ['2', '1'],
                target: [],
            })
        })

        test('moves disk when completing tower', () => {
            const tower = shallow(<Tower />)

            tower.setState({
                isTimeRunning: true,
                moves: 6,
                disks: 3,
                origin: ['1'],
                buffer: [],
                target: ['3', '2'],
            })

            tower.instance().moveDisk('1', 'origin', 'target')

            expect(tower.state()).toMatchObject({
                isComplete: true,
                isTimeRunning: false,
                moves: 7,
                origin: [],
                buffer: [],
                target: ['3', '2', '1'],
            })
        })
    })

    describe('sending tower events', () => {
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

        test('when disks is updated', () => {
            const tower = shallow(<Tower />)

            tower.instance().updateDisks('2')

            expect(
                utils.sendEvent,
            ).toHaveBeenNthCalledWith(
                1,
                'tower',
                'select',
                'disks-2',
            )
        })

        test('when disk is moved', () => {
            const tower = shallow(<Tower />)

            tower.setState({
                disks: 4,
                origin: ['4', '3', '2', '1'],
                buffer: [],
                target: [],
            })

            tower.instance().moveDisk('1', 'origin', 'buffer')

            expect(
                utils.sendEvent,
            ).toHaveBeenNthCalledWith(
                1,
                'tower',
                'move',
                'disk',
            )
        })

        test('when tower is completed', () => {
            const tower = shallow(<Tower />)

            tower.setState({
                isTimeRunning: true,
                moves: 6,
                disks: 3,
                origin: ['1'],
                buffer: [],
                target: ['3', '2'],
            })

            tower.instance().moveDisk('1', 'origin', 'target')

            expect(
                utils.sendEvent,
            ).toHaveBeenNthCalledWith(
                2,
                'tower',
                'complete',
                'disks-3',
                7,
            )
        })

        test('with getSendEventHandler for completed tower', () => {
            shallow(<Tower />)

            expect(
                utils.getSendEventHandler,
            ).toHaveBeenCalledTimes(4)
            expect(
                utils.getSendEventHandler,
            ).toHaveBeenNthCalledWith(
                1,
                'tower',
                'navigate',
                'PIA22931',
            )
        })
    })
})

describe('Tower snapshot', () => {
    test('matches snapshot', () => {
        const tower = shallow(<Tower />)

        expect(tower).toMatchSnapshot()
    })
})
