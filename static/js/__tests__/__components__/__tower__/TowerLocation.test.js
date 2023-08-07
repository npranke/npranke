import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import { collect, spec, TowerLocation } from '@components/tower/TowerLocation'

import * as OffsetListener from '@components/hooks/OffsetListener'

Enzyme.configure({ adapter: new Adapter() })

jest.mock('@components/tower/TowerDisk', () => {
    return 'TowerDisk'
})

const towerLayouts = ['landscape', 'portrait']
const towers = Array.from(
    { length: 4 },
    (value, index) => { return index + 2 },
).reduce((towerAccumulator, tower) => {
    towerAccumulator[tower] = {
        clickHandler: jest.fn(),
        link: 'tower-link',
    }

    towerLayouts.forEach((layout) => {
        towerAccumulator[tower][layout] = Array.from(
            { length: tower },
            (value, index) => {
                return {
                    diskid: `${index + 1}`,
                    image: (
                        <img src="" alt="alt-text" className="disk-image" />
                    ),
                }
            },
        )
    })

    return towerAccumulator
}, {})

describe('TowerLocation', () => {
    describe('drop target collect', () => {
        let connect

        beforeAll(() => {
            connect = {
                dropTarget: jest.fn(),
            }
        })

        afterEach(() => {
            connect.dropTarget.mockReset()
        })

        test('collect is a function', () => {
            expect(collect).toBeInstanceOf(Function)
        })

        test('returns object with expected key', () => {
            const collectResult = collect(connect)
            const collectResultKeys = Object.keys(collectResult)

            expect(collectResult).toBeInstanceOf(Object)
            expect(
                collectResultKeys.length,
            ).toBe(1)
            expect(
                collectResultKeys.indexOf('connectDropTarget'),
            ).toBeGreaterThan(-1)
        })

        test('calls connect.dropTarget', () => {
            collect(connect)

            expect(
                connect.dropTarget,
            ).toHaveBeenCalledTimes(1)
        })
    })

    describe('drop target spec', () => {
        let props, monitor

        beforeAll(() => {
            monitor = {
                getItem: jest.fn(),
            }
        })

        beforeEach(() => {
            props = {
                diskids: ['3', '2', '1'],
                disks: 3,
                isComplete: false,
                location: 'origin',
                moveDisk: jest.fn(),
                tower: towers[3],
            }
        })

        afterEach(() => {
            props.moveDisk.mockReset()
            props.tower.clickHandler.mockReset()
            monitor.getItem.mockReset()
        })

        test('spec is an object with expected 2 keys', () => {
            const specKeys = Object.keys(spec)

            expect(spec).toBeInstanceOf(Object)
            expect(
                Object.keys(spec).length,
            ).toBe(2)
            expect(
                specKeys.indexOf('drop'),
            ).toBeGreaterThan(-1)
            expect(
                specKeys.indexOf('canDrop'),
            ).toBeGreaterThan(-1)
        })

        test('drop returns expected object', () => {
            props.location = 'buffer'

            const dropResult = spec.drop(props)

            expect(
                dropResult,
            ).toEqual({ toLocation: 'buffer' })
        })

        test('canDrop returns false when isComplete true', () => {
            monitor.getItem.mockImplementationOnce(
                () => { return { diskid: '1' } },
            )
            props.diskids = ['3', '2', '1']
            props.isComplete = true
            props.location = 'target'

            const canDropResult = spec.canDrop(props, monitor)

            expect(canDropResult).toBe(false)
        })

        test('canDrop returns false when disk is larger than top', () => {
            monitor.getItem.mockImplementationOnce(
                () => { return { diskid: '2' } },
            )
            props.diskids = ['1']
            props.isComplete = false
            props.location = 'target'

            const canDropResult = spec.canDrop(props, monitor)

            expect(canDropResult).toBe(false)
        })

        test('canDrop returns true when disk is smaller than top', () => {
            monitor.getItem.mockImplementationOnce(
                () => { return { diskid: '2' } },
            )
            props.diskids = ['3']
            props.isComplete = false
            props.location = 'target'

            const canDropResult = spec.canDrop(props, monitor)

            expect(canDropResult).toBe(true)
        })

        test('canDrop returns true when diskids is empty', () => {
            monitor.getItem.mockImplementationOnce(
                () => { return { diskid: '3' } },
            )
            props.diskids = []
            props.isComplete = false
            props.location = 'target'

            const canDropResult = spec.canDrop(props, monitor)

            expect(canDropResult).toBe(true)
        })
    })

    test('has one location', () => {
        const towerLocation = shallow(
            <TowerLocation
                connectDropTarget={
                    jest.fn((locationNode) => { return locationNode })
                }
                disks={ 3 }
                location="buffer"
                moveDisk={ jest.fn() }
                tower={ towers[3] }
            />,
        )

        expect(
            towerLocation.find('.location').length,
        ).toBe(1)
    })

    test('has two location sections', () => {
        const towerLocation = shallow(
            <TowerLocation
                connectDropTarget={
                    jest.fn((locationNode) => { return locationNode })
                }
                disks={ 3 }
                location="buffer"
                moveDisk={ jest.fn() }
                tower={ towers[3] }
            />,
        )

        expect(
            towerLocation.find('.location-section').length,
        ).toBe(2)
    })

    test('has name section with name text', () => {
        const towerLocation = shallow(
            <TowerLocation
                connectDropTarget={
                    jest.fn((locationNode) => { return locationNode })
                }
                disks={ 3 }
                location="buffer"
                moveDisk={ jest.fn() }
                tower={ towers[3] }
            />,
        )

        expect(
            towerLocation.find('.location-section.name').length,
        ).toBe(1)
        expect(
            towerLocation.find('.location-section.name .name-text').text(),
        ).toEqual('buffer')
    })

    test('has disks section with specific location class', () => {
        const towerLocation = shallow(
            <TowerLocation
                connectDropTarget={
                    jest.fn((locationNode) => { return locationNode })
                }
                disks={ 3 }
                location="buffer"
                moveDisk={ jest.fn() }
                tower={ towers[3] }
            />,
        )

        expect(
            towerLocation.find('.location-section.disks').length,
        ).toBe(1)
        expect(
            towerLocation.find('.location-section.disks.buffer').length,
        ).toBe(1)
    })

    test('disks section has complete class when isComplete', () => {
        const towerLocation = shallow(
            <TowerLocation
                connectDropTarget={
                    jest.fn((locationNode) => { return locationNode })
                }
                diskids={ ['3', '2', '1'] }
                disks={ 3 }
                isComplete
                location="target"
                moveDisk={ jest.fn() }
                tower={ towers[3] }
            />,
        )

        expect(
            towerLocation.find('.disks.target.complete').length,
        ).toBe(1)
    })

    test('disks section has notcomplete class when not isComplete', () => {
        const towerLocation = shallow(
            <TowerLocation
                connectDropTarget={
                    jest.fn((locationNode) => { return locationNode })
                }
                diskids={ ['3', '2', '1'] }
                disks={ 3 }
                location="origin"
                moveDisk={ jest.fn() }
                tower={ towers[3] }
            />,
        )

        expect(
            towerLocation.find('.disks.origin.notcomplete').length,
        ).toBe(1)
    })

    test('disks section has link when isComplete', () => {
        const towerLocation = shallow(
            <TowerLocation
                connectDropTarget={
                    jest.fn((locationNode) => { return locationNode })
                }
                diskids={ ['3', '2', '1'] }
                disks={ 3 }
                isComplete
                location="target"
                moveDisk={ jest.fn() }
                tower={ towers[3] }
            />,
        )

        expect(
            towerLocation.find('.disks a').length,
        ).toBe(1)
        expect(
            towerLocation.find('.disks a').first().props().href,
        ).toEqual('tower-link')
    })

    test('disks section does not have link when not isComplete', () => {
        const towerLocation = shallow(
            <TowerLocation
                connectDropTarget={
                    jest.fn((locationNode) => { return locationNode })
                }
                diskids={ ['3', '2', '1'] }
                disks={ 3 }
                location="origin"
                moveDisk={ jest.fn() }
                tower={ towers[3] }
            />,
        )

        expect(
            towerLocation.find('.disks a').length,
        ).toBe(0)
    })

    test('has no disk wrappers with no disks', () => {
        const towerLocation = shallow(
            <TowerLocation
                connectDropTarget={
                    jest.fn((locationNode) => { return locationNode })
                }
                diskids={ [] }
                disks={ 3 }
                location="origin"
                moveDisk={ jest.fn() }
                tower={ towers[3] }
            />,
        )

        expect(
            towerLocation.find('.disk-wrapper TowerDisk').length,
        ).toBe(0)
    })

    test('has disk wrappers with some disks', () => {
        const towerLocation = shallow(
            <TowerLocation
                connectDropTarget={
                    jest.fn((locationNode) => { return locationNode })
                }
                diskids={ ['2', '1'] }
                disks={ 3 }
                location="buffer"
                moveDisk={ jest.fn() }
                tower={ towers[3] }
            />,
        )

        expect(
            towerLocation.find('.disk-wrapper TowerDisk').length,
        ).toBe(2)
    })

    test('has disk wrappers with all disks', () => {
        const towerLocation = shallow(
            <TowerLocation
                connectDropTarget={
                    jest.fn((locationNode) => { return locationNode })
                }
                diskids={ ['3', '2', '1'] }
                disks={ 3 }
                isComplete
                location="target"
                moveDisk={ jest.fn() }
                tower={ towers[3] }
            />,
        )

        expect(
            towerLocation.find('.disk-wrapper TowerDisk').length,
        ).toBe(3)
    })

    describe('setting disk height and width', () => {
        let useOffsetListener

        beforeAll(() => {
            useOffsetListener = jest.spyOn(OffsetListener, 'default')
        })

        afterEach(() => {
            useOffsetListener.mockClear()
        })

        afterAll(() => {
            useOffsetListener.mockRestore()
        })

        describe('when not isPortrait', () => {
            test('diskWidth greater than location width', () => {
                useOffsetListener.mockReturnValue(
                    { height: 1645, width: 452 },
                )

                const towerLocation = shallow(
                    <TowerLocation
                        connectDropTarget={
                            jest.fn((locationNode) => { return locationNode })
                        }
                        diskids={ ['3', '2'] }
                        disks={ 3 }
                        isComplete={ false }
                        location="target"
                        moveDisk={ jest.fn() }
                        tower={ towers[3] }
                    />,
                )

                towerLocation.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 164.5, width: 452 })
                    },
                )
            })

            test('diskWidth not greater than location width', () => {
                useOffsetListener.mockReturnValue(
                    { height: 3290, width: 904 },
                )

                const towerLocation = shallow(
                    <TowerLocation
                        connectDropTarget={
                            jest.fn((locationNode) => { return locationNode })
                        }
                        diskids={ ['3', '2', '1'] }
                        disks={ 3 }
                        isComplete
                        location="target"
                        moveDisk={ jest.fn() }
                        tower={ towers[3] }
                    />,
                )

                towerLocation.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 329, width: 904 })
                    },
                )
            })

            test('disks height greater than availableHeight', () => {
                useOffsetListener.mockReturnValue(
                    { height: 822.5, width: 904 },
                )

                const towerLocation = shallow(
                    <TowerLocation
                        connectDropTarget={
                            jest.fn((locationNode) => { return locationNode })
                        }
                        diskids={ ['3'] }
                        disks={ 3 }
                        isComplete={ false }
                        location="target"
                        moveDisk={ jest.fn() }
                        tower={ towers[3] }
                    />,
                )

                towerLocation.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 164.5, width: 452 })
                    },
                )
            })

            test('disks height not greater than availableHeight', () => {
                useOffsetListener.mockReturnValue(
                    { height: 1645, width: 904 },
                )

                const towerLocation = shallow(
                    <TowerLocation
                        connectDropTarget={
                            jest.fn((locationNode) => { return locationNode })
                        }
                        diskids={ ['3', '2', '1'] }
                        disks={ 3 }
                        isComplete
                        location="target"
                        moveDisk={ jest.fn() }
                        tower={ towers[3] }
                    />,
                )

                towerLocation.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 329, width: 904 })
                    },
                )
            })
        })

        describe('when isPortrait', () => {
            test('diskHeight greater than location height', () => {
                useOffsetListener.mockReturnValue(
                    { height: 452, width: 1645 },
                )

                const towerLocation = shallow(
                    <TowerLocation
                        connectDropTarget={
                            jest.fn((locationNode) => { return locationNode })
                        }
                        diskids={ ['3', '2'] }
                        disks={ 3 }
                        isComplete={ false }
                        isPortrait
                        location="target"
                        moveDisk={ jest.fn() }
                        tower={ towers[3] }
                    />,
                )

                towerLocation.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 452, width: 164.5 })
                    },
                )
            })

            test('diskHeight not greater than location height', () => {
                useOffsetListener.mockReturnValue(
                    { height: 904, width: 3290 },
                )

                const towerLocation = shallow(
                    <TowerLocation
                        connectDropTarget={
                            jest.fn((locationNode) => { return locationNode })
                        }
                        diskids={ ['3', '2', '1'] }
                        disks={ 3 }
                        isComplete
                        isPortrait
                        location="target"
                        moveDisk={ jest.fn() }
                        tower={ towers[3] }
                    />,
                )

                towerLocation.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 904, width: 329 })
                    },
                )
            })

            test('disks width greater than availableWidth', () => {
                useOffsetListener.mockReturnValue(
                    { height: 904, width: 822.5 },
                )

                const towerLocation = shallow(
                    <TowerLocation
                        connectDropTarget={
                            jest.fn((locationNode) => { return locationNode })
                        }
                        diskids={ ['3'] }
                        disks={ 3 }
                        isComplete={ false }
                        isPortrait
                        location="target"
                        moveDisk={ jest.fn() }
                        tower={ towers[3] }
                    />,
                )

                towerLocation.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 452, width: 164.5 })
                    },
                )
            })

            test('disks width not greater than availableWidth', () => {
                useOffsetListener.mockReturnValue(
                    { height: 904, width: 1645 },
                )

                const towerLocation = shallow(
                    <TowerLocation
                        connectDropTarget={
                            jest.fn((locationNode) => { return locationNode })
                        }
                        diskids={ ['3', '2', '1'] }
                        disks={ 3 }
                        isComplete
                        isPortrait
                        location="target"
                        moveDisk={ jest.fn() }
                        tower={ towers[3] }
                    />,
                )

                towerLocation.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 904, width: 329 })
                    },
                )
            })
        })
    })
})

describe('TowerLocation snapshot', () => {
    describe('when not isPortrait', () => {
        test('matches snapshot when empty', () => {
            const towerLocation = renderer.create(
                <TowerLocation
                    connectDropTarget={
                        jest.fn((locationNode) => { return locationNode })
                    }
                    diskids={ [] }
                    disks={ 2 }
                    location="buffer"
                    moveDisk={ jest.fn() }
                    tower={ towers[2] }
                />,
            ).toJSON()

            expect(towerLocation).toMatchSnapshot()
        })

        test('matches snapshot with some disks', () => {
            const towerLocation = renderer.create(
                <TowerLocation
                    connectDropTarget={
                        jest.fn((locationNode) => { return locationNode })
                    }
                    diskids={ ['1'] }
                    disks={ 2 }
                    location="buffer"
                    moveDisk={ jest.fn() }
                    tower={ towers[2] }
                />,
            ).toJSON()

            expect(towerLocation).toMatchSnapshot()
        })

        test('matches snapshot with all disks and not target', () => {
            const towerLocation = renderer.create(
                <TowerLocation
                    connectDropTarget={
                        jest.fn((locationNode) => { return locationNode })
                    }
                    diskids={ ['2', '1'] }
                    disks={ 2 }
                    isComplete={ false }
                    location="origin"
                    moveDisk={ jest.fn() }
                    tower={ towers[2] }
                />,
            ).toJSON()

            expect(towerLocation).toMatchSnapshot()
        })

        test('matches snapshot with all disks and target', () => {
            const towerLocation = renderer.create(
                <TowerLocation
                    connectDropTarget={
                        jest.fn((locationNode) => { return locationNode })
                    }
                    diskids={ ['2', '1'] }
                    disks={ 2 }
                    isComplete
                    location="target"
                    moveDisk={ jest.fn() }
                    tower={ towers[2] }
                />,
            ).toJSON()

            expect(towerLocation).toMatchSnapshot()
        })
    })

    describe('when isPortrait', () => {
        test('matches snapshot when empty', () => {
            const towerLocation = renderer.create(
                <TowerLocation
                    connectDropTarget={
                        jest.fn((locationNode) => { return locationNode })
                    }
                    diskids={ [] }
                    disks={ 4 }
                    isPortrait
                    location="buffer"
                    moveDisk={ jest.fn() }
                    tower={ towers[4] }
                />,
            ).toJSON()

            expect(towerLocation).toMatchSnapshot()
        })

        test('matches snapshot with some disks', () => {
            const towerLocation = renderer.create(
                <TowerLocation
                    connectDropTarget={
                        jest.fn((locationNode) => { return locationNode })
                    }
                    diskids={ ['3', '2'] }
                    disks={ 4 }
                    isPortrait
                    location="buffer"
                    moveDisk={ jest.fn() }
                    tower={ towers[4] }
                />,
            ).toJSON()

            expect(towerLocation).toMatchSnapshot()
        })

        test('matches snapshot with all disks and not target', () => {
            const towerLocation = renderer.create(
                <TowerLocation
                    connectDropTarget={
                        jest.fn((locationNode) => { return locationNode })
                    }
                    diskids={ ['4', '3', '2', '1'] }
                    disks={ 4 }
                    isComplete={ false }
                    isPortrait
                    location="origin"
                    moveDisk={ jest.fn() }
                    tower={ towers[4] }
                />,
            ).toJSON()

            expect(towerLocation).toMatchSnapshot()
        })

        test('matches snapshot with all disks and target', () => {
            const towerLocation = renderer.create(
                <TowerLocation
                    connectDropTarget={
                        jest.fn((locationNode) => { return locationNode })
                    }
                    diskids={ ['4', '3', '2', '1'] }
                    disks={ 4 }
                    isComplete
                    isPortrait
                    location="target"
                    moveDisk={ jest.fn() }
                    tower={ towers[4] }
                />,
            ).toJSON()

            expect(towerLocation).toMatchSnapshot()
        })
    })
})
