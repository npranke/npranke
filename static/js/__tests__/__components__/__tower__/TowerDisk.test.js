import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'
import { render } from '@testing-library/react'

import { collect, spec, TowerDisk } from '@components/tower/TowerDisk'

Enzyme.configure({ adapter: new Adapter() })

const diskImage = <img src="" alt="alt-text" className="disk-image" />

describe('TowerDisk', () => {
    describe('drag source collect', () => {
        let connect, monitor

        beforeAll(() => {
            connect = {
                dragPreview: jest.fn(),
                dragSource: jest.fn(),
            }
            monitor = {
                canDrag: jest.fn(),
                isDragging: jest.fn(),
            }
        })

        afterEach(() => {
            connect.dragPreview.mockReset()
            connect.dragSource.mockReset()
            monitor.canDrag.mockReset()
            monitor.isDragging.mockReset()
        })

        test('collect is a function', () => {
            expect(collect).toBeInstanceOf(Function)
        })

        test('returns object with expected 4 keys', () => {
            const collectResult = collect(connect, monitor)
            const collectResultKeys = Object.keys(collectResult)

            expect(collectResult).toBeInstanceOf(Object)
            expect(
                collectResultKeys.length,
            ).toBe(4)
            expect(
                collectResultKeys.indexOf('connectDragPreview'),
            ).toBeGreaterThan(-1)
            expect(
                collectResultKeys.indexOf('connectDragSource'),
            ).toBeGreaterThan(-1)
            expect(
                collectResultKeys.indexOf('canDrag'),
            ).toBeGreaterThan(-1)
            expect(
                collectResultKeys.indexOf('isDragging'),
            ).toBeGreaterThan(-1)
        })

        test('calls connect.dragPreview', () => {
            collect(connect, monitor)

            expect(
                connect.dragPreview,
            ).toHaveBeenCalledTimes(1)
        })

        test('calls connect.dragSource', () => {
            collect(connect, monitor)

            expect(
                connect.dragSource,
            ).toHaveBeenCalledTimes(1)
        })

        test('calls monitor.canDrag', () => {
            collect(connect, monitor)

            expect(
                monitor.canDrag,
            ).toHaveBeenCalledTimes(1)
        })

        test('calls monitor.isDragging', () => {
            collect(connect, monitor)

            expect(
                monitor.isDragging,
            ).toHaveBeenCalledTimes(1)
        })
    })

    describe('drag source spec', () => {
        let props, monitor

        beforeAll(() => {
            monitor = {
                didDrop: jest.fn(),
                getDropResult: jest.fn(),
            }
        })

        beforeEach(() => {
            props = {
                diskid: '1',
                diskids: ['3', '2', '1'],
                image: diskImage,
                isComplete: false,
                location: 'origin',
                moveDisk: jest.fn(),
            }
        })

        afterEach(() => {
            props.moveDisk.mockReset()
            monitor.didDrop.mockReset()
            monitor.getDropResult.mockReset()
        })

        test('spec is an object with expected 3 keys', () => {
            const specKeys = Object.keys(spec)

            expect(spec).toBeInstanceOf(Object)
            expect(
                Object.keys(spec).length,
            ).toBe(3)
            expect(
                specKeys.indexOf('beginDrag'),
            ).toBeGreaterThan(-1)
            expect(
                specKeys.indexOf('endDrag'),
            ).toBeGreaterThan(-1)
            expect(
                specKeys.indexOf('canDrag'),
            ).toBeGreaterThan(-1)
        })

        test('beginDrag returns expected object', () => {
            props.diskid = '2'
            props.diskids = ['3', '2']

            const beginDragResult = spec.beginDrag(props)

            expect(
                beginDragResult,
            ).toEqual({ diskid: '2' })
        })

        test('endDrag calls moveDisk when didDrop true', () => {
            monitor.didDrop.mockImplementationOnce(() => { return true })
            monitor.getDropResult.mockImplementationOnce(
                () => { return { toLocation: 'target' } },
            )

            spec.endDrag(props, monitor)

            expect(
                props.moveDisk,
            ).toHaveBeenNthCalledWith(
                1,
                '1',
                'origin',
                'target',
            )
        })

        test('endDrag does not call moveDisk when didDrop false', () => {
            monitor.didDrop.mockImplementationOnce(() => { return false })

            spec.endDrag(props, monitor)

            expect(
                props.moveDisk,
            ).not.toHaveBeenCalled()
        })

        test('canDrag returns false when isComplete true', () => {
            props.diskid = '1'
            props.diskids = ['3', '2', '1']
            props.isComplete = true
            props.location = 'target'

            const canDragResult = spec.canDrag(props)

            expect(canDragResult).toBe(false)
        })

        test('canDrag returns false when a middle disk', () => {
            props.diskid = '3'
            props.diskids = ['5', '4', '3', '2', '1']
            props.isComplete = false
            props.location = 'origin'

            const canDragResult = spec.canDrag(props)

            expect(canDragResult).toBe(false)
        })

        test('canDrag returns false when bottom disk', () => {
            props.diskid = '4'
            props.diskids = ['4', '3', '2', '1']
            props.isComplete = false
            props.location = 'origin'

            const canDragResult = spec.canDrag(props)

            expect(canDragResult).toBe(false)
        })

        test('canDrag returns true when top disk and not isComplete', () => {
            props.diskid = '1'
            props.diskids = ['2', '1']
            props.isComplete = false
            props.location = 'buffer'

            const canDragResult = spec.canDrag(props)

            expect(canDragResult).toBe(true)
        })
    })

    test('has one disk', () => {
        const towerDisk = shallow(
            <TowerDisk
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="1"
                image={ diskImage }
                location="buffer"
                moveDisk={ jest.fn() }
            />,
        )

        expect(
            towerDisk.find('.disk').length,
        ).toBe(1)
    })

    test('has one disk image', () => {
        const towerDisk = shallow(
            <TowerDisk
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="1"
                image={ diskImage }
                location="buffer"
                moveDisk={ jest.fn() }
            />,
        )

        expect(
            towerDisk.find('.disk-image').length,
        ).toBe(1)
        expect(
            towerDisk.find('img').length,
        ).toBe(1)
    })

    test('has one disk preview image', () => {
        const towerDisk = shallow(
            <TowerDisk
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="2"
                image={ diskImage }
                location="origin"
                moveDisk={ jest.fn() }
            />,
        )

        expect(
            towerDisk.find('DragPreviewImage').length,
        ).toBe(1)
        expect(
            towerDisk.find('DragPreviewImage').props().src,
        ).toBeTruthy()
    })

    test('has candrag class when canDrag true', () => {
        const towerDisk = shallow(
            <TowerDisk
                canDrag
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="1"
                image={ diskImage }
                location="origin"
                moveDisk={ jest.fn() }
            />,
        )

        expect(
            towerDisk.find('.disk.candrag').exists(),
        ).toBe(true)
    })

    test('does not have candrag class when canDrag false', () => {
        const towerDisk = shallow(
            <TowerDisk
                canDrag={ false }
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="1"
                image={ diskImage }
                location="origin"
                moveDisk={ jest.fn() }
            />,
        )

        expect(
            towerDisk.find('.disk.candrag').exists(),
        ).toBe(false)
    })

    test('has dragging class when isDragging true', () => {
        const towerDisk = shallow(
            <TowerDisk
                isDragging
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="1"
                image={ diskImage }
                location="origin"
                moveDisk={ jest.fn() }
            />,
        )

        expect(
            towerDisk.find('.disk.dragging').exists(),
        ).toBe(true)
    })

    test('does not have dragging class when isDragging false', () => {
        const towerDisk = shallow(
            <TowerDisk
                isDragging={ false }
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="1"
                image={ diskImage }
                location="origin"
                moveDisk={ jest.fn() }
            />,
        )

        expect(
            towerDisk.find('.disk.dragging').exists(),
        ).toBe(false)
    })

    test('has disk drag layer when isDragging true', () => {
        const towerDisk = shallow(
            <TowerDisk
                isDragging
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="3"
                image={ diskImage }
                location="origin"
                moveDisk={ jest.fn() }
            />,
        )

        expect(
            towerDisk.find('TowerDiskDragLayer').exists(),
        ).toBe(true)
    })

    test('does not have disk drag layer when isDragging false', () => {
        const towerDisk = shallow(
            <TowerDisk
                isDragging={ false }
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="2"
                image={ diskImage }
                location="buffer"
                moveDisk={ jest.fn() }
            />,
        )

        expect(
            towerDisk.find('TowerDiskDragLayer').exists(),
        ).toBe(false)
    })
})

describe('TowerDisk snapshot', () => {
    test('matches snapshot with isDragging false', () => {
        const { asFragment } = render(
            <TowerDisk
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="1"
                image={ diskImage }
                isDragging={ false }
                location="buffer"
                moveDisk={ jest.fn() }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    test('matches snapshot with isDragging true', () => {
        const { asFragment } = render(
            <TowerDisk
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="1"
                image={ diskImage }
                isDragging
                location="buffer"
                moveDisk={ jest.fn() }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
