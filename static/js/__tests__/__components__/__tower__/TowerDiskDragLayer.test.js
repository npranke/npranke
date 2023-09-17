import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import { render } from '@testing-library/react'

import {
    collect,
    TowerDiskDragLayer,
} from '@components/tower/TowerDiskDragLayer'

Enzyme.configure({ adapter: new Adapter() })

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

    test('has one disk drag layer', () => {
        const towerDiskDragLayer = shallow(
            <TowerDiskDragLayer image={ diskImage } />,
        )

        expect(
            towerDiskDragLayer.find('.disk-drag-layer').length,
        ).toBe(1)
    })

    test('disk drag layer has expected style', () => {
        const towerDiskDragLayer = shallow(
            <TowerDiskDragLayer image={ diskImage } />,
        )

        expect(
            towerDiskDragLayer.find('.disk-drag-layer').props().style,
        ).toEqual({
            pointerEvents: 'none',
            position: 'fixed',
            zIndex: 10,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
        })
    })

    test('has one disk with dragging-preview class', () => {
        const towerDiskDragLayer = shallow(
            <TowerDiskDragLayer image={ diskImage } />,
        )

        expect(
            towerDiskDragLayer.find('.disk').length,
        ).toBe(1)
        expect(
            towerDiskDragLayer.find('.disk.dragging-preview').length,
        ).toBe(1)
    })

    test('has one disk image', () => {
        const towerDiskDragLayer = shallow(
            <TowerDiskDragLayer image={ diskImage } />,
        )

        expect(
            towerDiskDragLayer.find('.disk-image').length,
        ).toBe(1)
        expect(
            towerDiskDragLayer.find('img').length,
        ).toBe(1)
    })

    test('disk has expected style with sourceClientOffset', () => {
        const towerDiskDragLayer = shallow(
            <TowerDiskDragLayer
                image={ diskImage }
                height={ 150 }
                width={ 300 }
                sourceClientOffset={ { x: 25, y: 75 } }
            />,
        )

        expect(
            towerDiskDragLayer.find('.disk.dragging-preview').props().style,
        ).toEqual({
            height: 150,
            width: 300,
            transform: 'translate(25px, 75px)',
        })
    })

    test('disk has expected style without sourceClientOffset', () => {
        const towerDiskDragLayer = shallow(
            <TowerDiskDragLayer
                image={ diskImage }
                height={ 150 }
                width={ 300 }
            />,
        )

        expect(
            towerDiskDragLayer.find('.disk.dragging-preview').props().style,
        ).toEqual({ display: 'none' })
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
