import { render, screen } from '@testing-library/react'

import {
    collect,
    TowerDiskDragLayer,
} from '@components/tower/TowerDiskDragLayer'

const diskImage = <img src="" alt="alt-text" className="disk-image" />

describe('TowerDiskDragLayer', () => {
    describe('drag layer collect', () => {
        let monitor

        beforeAll(() => {
            monitor = {
                getSourceClientOffset: jest.fn(),
            }
        })

        afterEach(() => {
            monitor.getSourceClientOffset.mockReset()
        })

        test('collect is a function', () => {
            expect(collect).toBeInstanceOf(Function)
        })

        test('returns object with expected key', () => {
            const collectResult = collect(monitor)
            const collectResultKeys = Object.keys(collectResult)

            expect(collectResult).toBeInstanceOf(Object)
            expect(
                collectResultKeys.length,
            ).toBe(1)
            expect(
                collectResultKeys.indexOf('sourceClientOffset'),
            ).toBeGreaterThan(-1)
        })

        test('calls monitor.getSourceClientOffset', () => {
            collect(monitor)

            expect(
                monitor.getSourceClientOffset,
            ).toHaveBeenCalledTimes(1)
        })
    })

    test('has disk drag layer', () => {
        render(
            <TowerDiskDragLayer image={ diskImage } />,
        )

        expect(
            screen.getByTestId('disk-drag-layer-elem'),
        ).toHaveClass('disk-drag-layer')
    })

    test('disk drag layer has expected style', () => {
        render(
            <TowerDiskDragLayer image={ diskImage } />,
        )

        expect(
            screen.getByTestId('disk-drag-layer-elem'),
        ).toHaveStyle({
            pointerEvents: 'none',
            position: 'fixed',
            zIndex: '10',
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%',
        })
    })

    test('has dragging preview disk', () => {
        render(
            <TowerDiskDragLayer image={ diskImage } />,
        )

        expect(
            screen.getByTestId('disk-drag-preview-elem'),
        ).toHaveClass('disk', 'dragging-preview')
    })

    test('has hidden disk image', () => {
        render(
            <TowerDiskDragLayer image={ diskImage } />,
        )

        expect(
            screen.getByRole('img', { hidden: true }),
        ).toHaveClass('disk-image')
    })

    test('disk has expected style with sourceClientOffset', () => {
        render(
            <TowerDiskDragLayer
                image={ diskImage }
                height={ 150 }
                width={ 300 }
                sourceClientOffset={ { x: 25, y: 75 } }
            />,
        )

        expect(
            screen.getByTestId('disk-drag-preview-elem'),
        ).toHaveStyle({
            height: '150px',
            width: '300px',
            transform: 'translate(25px, 75px)',
        })
    })

    test('disk has expected style without sourceClientOffset', () => {
        render(
            <TowerDiskDragLayer
                image={ diskImage }
                height={ 150 }
                width={ 300 }
            />,
        )

        expect(
            screen.getByTestId('disk-drag-preview-elem'),
        ).toHaveStyle({ display: 'none' })
    })
})

describe('TowerDiskDragLayer snapshot', () => {
    test('matches snapshot with sourceClientOffset', () => {
        const { asFragment } = render(
            <TowerDiskDragLayer
                image={ diskImage }
                height={ 150 }
                width={ 300 }
                sourceClientOffset={ { x: 25, y: 75 } }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    test('matches snapshot without sourceClientOffset', () => {
        const { asFragment } = render(
            <TowerDiskDragLayer
                image={ diskImage }
                height={ 150 }
                width={ 300 }
            />,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
