import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import { collect, spec, TowerElement } from '@components/tower/TowerElement'

import * as OffsetListener from '@components/hooks/OffsetListener'

Enzyme.configure({ adapter: new Adapter() })

const towerLayouts = ['landscape', 'portrait']
const towers = Array.from(
    { length: 4 },
    (value, index) => { return index + 2 },
).reduce((towerAccumulator, tower) => {
    towerAccumulator[tower] = {
        navigateLink: 'navigate-link',
        navigateEventHandler: jest.fn(),
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

describe('TowerElement', () => {
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
                disks: 3,
                diskids: ['3', '2', '1'],
                isComplete: false,
                moveDisk: jest.fn(),
                name: 'origin',
                tower: towers[3],
            }
        })

        afterEach(() => {
            props.moveDisk.mockReset()
            props.tower.navigateEventHandler.mockReset()
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
            props.name = 'buffer'

            const dropResult = spec.drop(props)

            expect(
                dropResult,
            ).toEqual({ toTower: 'buffer' })
        })

        test('canDrop returns false when isComplete true', () => {
            monitor.getItem.mockImplementationOnce(
                () => { return { diskid: '1' } },
            )
            props.diskids = ['3', '2', '1']
            props.isComplete = true
            props.name = 'target'

            const canDropResult = spec.canDrop(props, monitor)

            expect(canDropResult).toBe(false)
        })

        test('canDrop returns false when disk is larger than top', () => {
            monitor.getItem.mockImplementationOnce(
                () => { return { diskid: '2' } },
            )
            props.diskids = ['1']
            props.isComplete = false
            props.name = 'target'

            const canDropResult = spec.canDrop(props, monitor)

            expect(canDropResult).toBe(false)
        })

        test('canDrop returns true when disk is smaller than top', () => {
            monitor.getItem.mockImplementationOnce(
                () => { return { diskid: '2' } },
            )
            props.diskids = ['3']
            props.isComplete = false
            props.name = 'target'

            const canDropResult = spec.canDrop(props, monitor)

            expect(canDropResult).toBe(true)
        })

        test('canDrop returns true when diskids is empty', () => {
            monitor.getItem.mockImplementationOnce(
                () => { return { diskid: '3' } },
            )
            props.diskids = []
            props.isComplete = false
            props.name = 'target'

            const canDropResult = spec.canDrop(props, monitor)

            expect(canDropResult).toBe(true)
        })
    })

    test('has one element', () => {
        const towerElement = shallow(
            <TowerElement
                connectDropTarget={
                    jest.fn((elementNode) => { return elementNode })
                }
                disks={ 3 }
                moveDisk={ jest.fn() }
                name="buffer"
                tower={ towers[3] }
            />,
        )

        expect(
            towerElement.find('.element').length,
        ).toBe(1)
    })

    test('has two element sections', () => {
        const towerElement = shallow(
            <TowerElement
                connectDropTarget={
                    jest.fn((elementNode) => { return elementNode })
                }
                disks={ 3 }
                moveDisk={ jest.fn() }
                name="buffer"
                tower={ towers[3] }
            />,
        )

        expect(
            towerElement.find('.element-section').length,
        ).toBe(2)
    })

    test('has base section with name text', () => {
        const towerElement = shallow(
            <TowerElement
                connectDropTarget={
                    jest.fn((elementNode) => { return elementNode })
                }
                disks={ 3 }
                moveDisk={ jest.fn() }
                name="buffer"
                tower={ towers[3] }
            />,
        )

        expect(
            towerElement.find('.element-section.base').length,
        ).toBe(1)
        expect(
            towerElement.find('.element-section.base .name-text').text(),
        ).toEqual('buffer')
    })

    test('has disks section with name class', () => {
        const towerElement = shallow(
            <TowerElement
                connectDropTarget={
                    jest.fn((elementNode) => { return elementNode })
                }
                disks={ 3 }
                moveDisk={ jest.fn() }
                name="buffer"
                tower={ towers[3] }
            />,
        )

        expect(
            towerElement.find('.element-section.disks').length,
        ).toBe(1)
        expect(
            towerElement.find('.element-section.disks.buffer').length,
        ).toBe(1)
    })

    test('disks section has complete class when isComplete', () => {
        const towerElement = shallow(
            <TowerElement
                connectDropTarget={
                    jest.fn((elementNode) => { return elementNode })
                }
                diskids={ ['3', '2', '1'] }
                disks={ 3 }
                isComplete
                moveDisk={ jest.fn() }
                name="target"
                tower={ towers[3] }
            />,
        )

        expect(
            towerElement.find('.disks.target.complete').length,
        ).toBe(1)
    })

    test('disks section has notcomplete class when not isComplete', () => {
        const towerElement = shallow(
            <TowerElement
                connectDropTarget={
                    jest.fn((elementNode) => { return elementNode })
                }
                diskids={ ['3', '2', '1'] }
                disks={ 3 }
                moveDisk={ jest.fn() }
                name="origin"
                tower={ towers[3] }
            />,
        )

        expect(
            towerElement.find('.disks.origin.notcomplete').length,
        ).toBe(1)
    })

    test('disks section has link when isComplete', () => {
        const towerElement = shallow(
            <TowerElement
                connectDropTarget={
                    jest.fn((elementNode) => { return elementNode })
                }
                diskids={ ['3', '2', '1'] }
                disks={ 3 }
                isComplete
                moveDisk={ jest.fn() }
                name="target"
                tower={ towers[3] }
            />,
        )

        expect(
            towerElement.find('.disks a').length,
        ).toBe(1)
        expect(
            towerElement.find('.disks a').first().props().href,
        ).toEqual('navigate-link')
    })

    test('disks section does not have link when not isComplete', () => {
        const towerElement = shallow(
            <TowerElement
                connectDropTarget={
                    jest.fn((elementNode) => { return elementNode })
                }
                diskids={ ['3', '2', '1'] }
                disks={ 3 }
                moveDisk={ jest.fn() }
                name="origin"
                tower={ towers[3] }
            />,
        )

        expect(
            towerElement.find('.disks a').length,
        ).toBe(0)
    })

    test('has no disk wrappers with no disks', () => {
        const towerElement = shallow(
            <TowerElement
                connectDropTarget={
                    jest.fn((elementNode) => { return elementNode })
                }
                diskids={ [] }
                disks={ 3 }
                moveDisk={ jest.fn() }
                name="origin"
                tower={ towers[3] }
            />,
        )

        expect(
            towerElement.find('.disk-wrapper TowerDisk').length,
        ).toBe(0)
    })

    test('has disk wrappers with some disks', () => {
        const towerElement = shallow(
            <TowerElement
                connectDropTarget={
                    jest.fn((elementNode) => { return elementNode })
                }
                diskids={ ['2', '1'] }
                disks={ 3 }
                moveDisk={ jest.fn() }
                name="buffer"
                tower={ towers[3] }
            />,
        )

        expect(
            towerElement.find('.disk-wrapper TowerDisk').length,
        ).toBe(2)
    })

    test('has disk wrappers with all disks', () => {
        const towerElement = shallow(
            <TowerElement
                connectDropTarget={
                    jest.fn((elementNode) => { return elementNode })
                }
                diskids={ ['3', '2', '1'] }
                disks={ 3 }
                isComplete
                moveDisk={ jest.fn() }
                name="target"
                tower={ towers[3] }
            />,
        )

        expect(
            towerElement.find('.disk-wrapper TowerDisk').length,
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
            test('diskWidth greater than element width', () => {
                useOffsetListener.mockReturnValue(
                    { height: 1175, width: 452 },
                )

                const towerElement = shallow(
                    <TowerElement
                        connectDropTarget={
                            jest.fn((elementNode) => { return elementNode })
                        }
                        diskids={ ['5', '4'] }
                        disks={ 5 }
                        isComplete={ false }
                        moveDisk={ jest.fn() }
                        name="target"
                        tower={ towers[5] }
                    />,
                )

                towerElement.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 164.5, width: 452 })
                    },
                )
            })

            test('diskWidth not greater than element width', () => {
                useOffsetListener.mockReturnValue(
                    { height: 2350, width: 904 },
                )

                const towerElement = shallow(
                    <TowerElement
                        connectDropTarget={
                            jest.fn((elementNode) => { return elementNode })
                        }
                        diskids={ ['5', '4', '3'] }
                        disks={ 5 }
                        isComplete={ false }
                        moveDisk={ jest.fn() }
                        name="target"
                        tower={ towers[5] }
                    />,
                )

                towerElement.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 329, width: 904 })
                    },
                )
            })

            test('disks height greater than availableHeight', () => {
                useOffsetListener.mockReturnValue(
                    { height: 940, width: 904 },
                )

                const towerElement = shallow(
                    <TowerElement
                        connectDropTarget={
                            jest.fn((elementNode) => { return elementNode })
                        }
                        diskids={ ['4'] }
                        disks={ 4 }
                        isComplete={ false }
                        moveDisk={ jest.fn() }
                        name="target"
                        tower={ towers[4] }
                    />,
                )

                towerElement.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 164.5, width: 452 })
                    },
                )
            })

            test('disks height not greater than availableHeight', () => {
                useOffsetListener.mockReturnValue(
                    { height: 1880, width: 904 },
                )

                const towerElement = shallow(
                    <TowerElement
                        connectDropTarget={
                            jest.fn((elementNode) => { return elementNode })
                        }
                        diskids={ ['4', '3', '2', '1'] }
                        disks={ 4 }
                        isComplete
                        moveDisk={ jest.fn() }
                        name="target"
                        tower={ towers[4] }
                    />,
                )

                towerElement.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 329, width: 904 })
                    },
                )
            })
        })

        describe('when isPortrait', () => {
            test('diskHeight greater than element height', () => {
                useOffsetListener.mockReturnValue(
                    { height: 452, width: 1175 },
                )

                const towerElement = shallow(
                    <TowerElement
                        connectDropTarget={
                            jest.fn((elementNode) => { return elementNode })
                        }
                        diskids={ ['5', '4'] }
                        disks={ 5 }
                        isComplete={ false }
                        isPortrait
                        moveDisk={ jest.fn() }
                        name="target"
                        tower={ towers[5] }
                    />,
                )

                towerElement.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 452, width: 164.5 })
                    },
                )
            })

            test('diskHeight not greater than element height', () => {
                useOffsetListener.mockReturnValue(
                    { height: 904, width: 2350 },
                )

                const towerElement = shallow(
                    <TowerElement
                        connectDropTarget={
                            jest.fn((elementNode) => { return elementNode })
                        }
                        diskids={ ['5', '4', '3'] }
                        disks={ 5 }
                        isComplete={ false }
                        isPortrait
                        moveDisk={ jest.fn() }
                        name="target"
                        tower={ towers[5] }
                    />,
                )

                towerElement.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 904, width: 329 })
                    },
                )
            })

            test('disks width greater than availableWidth', () => {
                useOffsetListener.mockReturnValue(
                    { height: 904, width: 940 },
                )

                const towerElement = shallow(
                    <TowerElement
                        connectDropTarget={
                            jest.fn((elementNode) => { return elementNode })
                        }
                        diskids={ ['4'] }
                        disks={ 4 }
                        isComplete={ false }
                        isPortrait
                        moveDisk={ jest.fn() }
                        name="target"
                        tower={ towers[4] }
                    />,
                )

                towerElement.find('.disk-wrapper').forEach(
                    (diskWrapper) => {
                        expect(
                            diskWrapper.props().style,
                        ).toEqual({ height: 452, width: 164.5 })
                    },
                )
            })

            test('disks width not greater than availableWidth', () => {
                useOffsetListener.mockReturnValue(
                    { height: 904, width: 1880 },
                )

                const towerElement = shallow(
                    <TowerElement
                        connectDropTarget={
                            jest.fn((elementNode) => { return elementNode })
                        }
                        diskids={ ['4', '3', '2', '1'] }
                        disks={ 4 }
                        isComplete
                        isPortrait
                        moveDisk={ jest.fn() }
                        name="target"
                        tower={ towers[4] }
                    />,
                )

                towerElement.find('.disk-wrapper').forEach(
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

describe('TowerElement snapshot', () => {
    describe('when not isPortrait', () => {
        test('matches snapshot when empty', () => {
            const towerElement = shallow(
                <TowerElement
                    connectDropTarget={
                        jest.fn((elementNode) => { return elementNode })
                    }
                    diskids={ [] }
                    disks={ 2 }
                    moveDisk={ jest.fn() }
                    name="buffer"
                    tower={ towers[2] }
                />,
            )

            expect(towerElement).toMatchSnapshot()
        })

        test('matches snapshot with some disks', () => {
            const towerElement = shallow(
                <TowerElement
                    connectDropTarget={
                        jest.fn((elementNode) => { return elementNode })
                    }
                    diskids={ ['1'] }
                    disks={ 2 }
                    moveDisk={ jest.fn() }
                    name="buffer"
                    tower={ towers[2] }
                />,
            )

            expect(towerElement).toMatchSnapshot()
        })

        test('matches snapshot with all disks and not target', () => {
            const towerElement = shallow(
                <TowerElement
                    connectDropTarget={
                        jest.fn((elementNode) => { return elementNode })
                    }
                    diskids={ ['2', '1'] }
                    disks={ 2 }
                    isComplete={ false }
                    moveDisk={ jest.fn() }
                    name="origin"
                    tower={ towers[2] }
                />,
            )

            expect(towerElement).toMatchSnapshot()
        })

        test('matches snapshot with all disks and target', () => {
            const towerElement = shallow(
                <TowerElement
                    connectDropTarget={
                        jest.fn((elementNode) => { return elementNode })
                    }
                    diskids={ ['2', '1'] }
                    disks={ 2 }
                    isComplete
                    moveDisk={ jest.fn() }
                    name="target"
                    tower={ towers[2] }
                />,
            )

            expect(towerElement).toMatchSnapshot()
        })
    })

    describe('when isPortrait', () => {
        test('matches snapshot when empty', () => {
            const towerElement = shallow(
                <TowerElement
                    connectDropTarget={
                        jest.fn((elementNode) => { return elementNode })
                    }
                    diskids={ [] }
                    disks={ 4 }
                    isPortrait
                    moveDisk={ jest.fn() }
                    name="buffer"
                    tower={ towers[4] }
                />,
            )

            expect(towerElement).toMatchSnapshot()
        })

        test('matches snapshot with some disks', () => {
            const towerElement = shallow(
                <TowerElement
                    connectDropTarget={
                        jest.fn((elementNode) => { return elementNode })
                    }
                    diskids={ ['3', '2'] }
                    disks={ 4 }
                    isPortrait
                    moveDisk={ jest.fn() }
                    name="buffer"
                    tower={ towers[4] }
                />,
            )

            expect(towerElement).toMatchSnapshot()
        })

        test('matches snapshot with all disks and not target', () => {
            const towerElement = shallow(
                <TowerElement
                    connectDropTarget={
                        jest.fn((elementNode) => { return elementNode })
                    }
                    diskids={ ['4', '3', '2', '1'] }
                    disks={ 4 }
                    isComplete={ false }
                    isPortrait
                    moveDisk={ jest.fn() }
                    name="origin"
                    tower={ towers[4] }
                />,
            )

            expect(towerElement).toMatchSnapshot()
        })

        test('matches snapshot with all disks and target', () => {
            const towerElement = shallow(
                <TowerElement
                    connectDropTarget={
                        jest.fn((elementNode) => { return elementNode })
                    }
                    diskids={ ['4', '3', '2', '1'] }
                    disks={ 4 }
                    isComplete
                    isPortrait
                    moveDisk={ jest.fn() }
                    name="target"
                    tower={ towers[4] }
                />,
            )

            expect(towerElement).toMatchSnapshot()
        })
    })
})
