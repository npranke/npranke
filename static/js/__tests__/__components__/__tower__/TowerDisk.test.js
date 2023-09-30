import { render, screen } from '@testing-library/react'

import { collect, spec, TowerDisk } from '@components/tower/TowerDisk'

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

    test('has disk image', () => {
        render(
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
            screen.getByRole('img'),
        ).toHaveClass('disk-image')
    })
})

describe('TowerDisk snapshot', () => {
    test('matches snapshot with canDrag false', () => {
        const { asFragment } = render(
            <TowerDisk
                canDrag={ false }
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="1"
                image={ diskImage }
                location="buffer"
                moveDisk={ jest.fn() }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    test('matches snapshot with canDrag true', () => {
        const { asFragment } = render(
            <TowerDisk
                canDrag
                connectDragSource={
                    jest.fn((diskNode) => { return diskNode })
                }
                diskid="1"
                image={ diskImage }
                location="buffer"
                moveDisk={ jest.fn() }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })

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
