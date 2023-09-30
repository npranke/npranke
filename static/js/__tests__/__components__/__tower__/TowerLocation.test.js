import { render, screen } from '@testing-library/react'

import { collect, spec, TowerLocation } from '@components/tower/TowerLocation'

import * as OffsetListener from '@components/hooks/OffsetListener'

jest.mock('@components/tower/TowerDisk', () => {
    return {
        __esModule: true,
        default: () => { return ('TowerDisk') },
    }
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

    test('has location name', () => {
        render(
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
            screen.getByText(/^buffer$/),
        ).toHaveClass('name-text', { exact: true })
    })

    test('has link when complete', () => {
        render(
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
            screen.getByRole('link', { name: 'NASA/JPL Space Images' }),
        ).toHaveAttribute('href', 'tower-link')
    })

    test('does not have link when not complete', () => {
        render(
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
            screen.queryAllByRole('link'),
        ).toHaveLength(0)
    })

    test('no disks when no diskids', () => {
        render(
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
            screen.queryAllByText('TowerDisk'),
        ).toHaveLength(0)
    })

    test('wraps each disk when some diskids', () => {
        render(
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

        const towerDisks = screen.queryAllByText('TowerDisk')

        expect(towerDisks).toHaveLength(2)

        towerDisks.forEach((towerDisk) => {
            expect(
                towerDisk,
            ).toHaveClass('disk-wrapper', { exact: true })
        })
    })

    test('wraps each disk when all diskids', () => {
        render(
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

        const towerDisks = screen.queryAllByText('TowerDisk')

        expect(towerDisks).toHaveLength(3)

        towerDisks.forEach((towerDisk) => {
            expect(
                towerDisk,
            ).toHaveClass('disk-wrapper', { exact: true })
        })
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

                render(
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

                screen.getAllByText('TowerDisk').forEach((towerDisk) => {
                    expect(
                        towerDisk,
                    ).toHaveStyle({ height: '164.5px', width: '452px' })
                })
            })

            test('diskWidth not greater than location width', () => {
                useOffsetListener.mockReturnValue(
                    { height: 3290, width: 904 },
                )

                render(
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

                screen.getAllByText('TowerDisk').forEach((towerDisk) => {
                    expect(
                        towerDisk,
                    ).toHaveStyle({ height: '329px', width: '904px' })
                })
            })

            test('disks height greater than availableHeight', () => {
                useOffsetListener.mockReturnValue(
                    { height: 822.5, width: 904 },
                )

                render(
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

                screen.getAllByText('TowerDisk').forEach((towerDisk) => {
                    expect(
                        towerDisk,
                    ).toHaveStyle({ height: '164.5px', width: '452px' })
                })
            })

            test('disks height not greater than availableHeight', () => {
                useOffsetListener.mockReturnValue(
                    { height: 1645, width: 904 },
                )

                render(
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

                screen.getAllByText('TowerDisk').forEach((towerDisk) => {
                    expect(
                        towerDisk,
                    ).toHaveStyle({ height: '329px', width: '904px' })
                })
            })
        })

        describe('when isPortrait', () => {
            test('diskHeight greater than location height', () => {
                useOffsetListener.mockReturnValue(
                    { height: 452, width: 1645 },
                )

                render(
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

                screen.getAllByText('TowerDisk').forEach((towerDisk) => {
                    expect(
                        towerDisk,
                    ).toHaveStyle({ height: '452px', width: '164.5px' })
                })
            })

            test('diskHeight not greater than location height', () => {
                useOffsetListener.mockReturnValue(
                    { height: 904, width: 3290 },
                )

                render(
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

                screen.getAllByText('TowerDisk').forEach((towerDisk) => {
                    expect(
                        towerDisk,
                    ).toHaveStyle({ height: '904px', width: '329px' })
                })
            })

            test('disks width greater than availableWidth', () => {
                useOffsetListener.mockReturnValue(
                    { height: 904, width: 822.5 },
                )

                render(
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

                screen.getAllByText('TowerDisk').forEach((towerDisk) => {
                    expect(
                        towerDisk,
                    ).toHaveStyle({ height: '452px', width: '164.5px' })
                })
            })

            test('disks width not greater than availableWidth', () => {
                useOffsetListener.mockReturnValue(
                    { height: 904, width: 1645 },
                )

                render(
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

                screen.getAllByText('TowerDisk').forEach((towerDisk) => {
                    expect(
                        towerDisk,
                    ).toHaveStyle({ height: '904px', width: '329px' })
                })
            })
        })
    })
})

describe('TowerLocation snapshot', () => {
    describe('when not isPortrait', () => {
        test('matches snapshot when empty', () => {
            const { asFragment } = render(
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
            )

            expect(asFragment()).toMatchSnapshot()
        })

        test('matches snapshot with some disks', () => {
            const { asFragment } = render(
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
            )

            expect(asFragment()).toMatchSnapshot()
        })

        test('matches snapshot with all disks and not target', () => {
            const { asFragment } = render(
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
            )

            expect(asFragment()).toMatchSnapshot()
        })

        test('matches snapshot with all disks and target', () => {
            const { asFragment } = render(
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
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe('when isPortrait', () => {
        test('matches snapshot when empty', () => {
            const { asFragment } = render(
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
            )

            expect(asFragment()).toMatchSnapshot()
        })

        test('matches snapshot with some disks', () => {
            const { asFragment } = render(
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
            )

            expect(asFragment()).toMatchSnapshot()
        })

        test('matches snapshot with all disks and not target', () => {
            const { asFragment } = render(
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
            )

            expect(asFragment()).toMatchSnapshot()
        })

        test('matches snapshot with all disks and target', () => {
            const { asFragment } = render(
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
            )

            expect(asFragment()).toMatchSnapshot()
        })
    })
})
