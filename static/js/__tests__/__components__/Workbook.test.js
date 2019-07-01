import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'

import { Workbook } from '@components/Workbook'

Enzyme.configure({ adapter: new Adapter() })

describe('Workbook', () => {
    beforeAll(() => {
        window.alert = jest.fn()
    })

    afterEach(() => {
        window.alert.mockReset()
    })

    test('has link to concentration', () => {
        const workbook = shallow(<Workbook />)

        expect(
            workbook.find('#workbook-worksheet-concentration Link').props().to,
        ).toEqual('/workbook/concentration')
    })

    test('has alt text for concentration icon', () => {
        const workbook = shallow(<Workbook />)

        expect(
            workbook.find('#workbook-worksheet-concentration img').props().alt,
        ).toEqual('Concentration icon')
    })

    test('has multiple rows when portrait', () => {
        const workbook = shallow(<Workbook isPortrait />)

        expect(
            workbook.find('.table-row-workbook').length,
        ).toBeGreaterThan(1)
    })

    test('has one row when not portrait', () => {
        const workbook = shallow(<Workbook />)

        expect(
            workbook.find('.table-row-workbook'),
        ).toHaveLength(1)
    })

    test('arrow right key up event on worksheet when not isPortrait', () => {
        const workbook = mount(
            <Workbook />,
            { wrappingComponent: MemoryRouter },
        )

        workbook.find('#workbook-worksheet-concentration').simulate(
            'keyup',
            { key: 'ArrowRight' },
        )

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)
    })

    test('arrow left key up event on worksheet when not isPortrait', () => {
        const workbook = mount(
            <Workbook />,
            { wrappingComponent: MemoryRouter },
        )

        workbook.find('#workbook-worksheet-concentration').simulate(
            'keyup',
            { key: 'ArrowLeft' },
        )

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('arrow up key up event on worksheet when not isPortrait', () => {
        const workbook = mount(
            <Workbook />,
            { wrappingComponent: MemoryRouter },
        )

        workbook.find('#workbook-worksheet-concentration').simulate(
            'keyup',
            { key: 'ArrowUp' },
        )

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('arrow down key up event on worksheet when not isPortrait', () => {
        const workbook = mount(
            <Workbook />,
            { wrappingComponent: MemoryRouter },
        )

        workbook.find('#workbook-worksheet-concentration').simulate(
            'keyup',
            { key: 'ArrowDown' },
        )

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('home key up event on worksheet when not isPortrait', () => {
        const workbook = mount(
            <Workbook />,
            { wrappingComponent: MemoryRouter },
        )

        workbook.find('#workbook-worksheet-concentration').simulate(
            'keyup',
            { key: 'Home' },
        )

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('end key up event on worksheet when not isPortrait', () => {
        const workbook = mount(
            <Workbook />,
            { wrappingComponent: MemoryRouter },
        )

        workbook.find('#workbook-worksheet-concentration').simulate(
            'keyup',
            { key: 'End' },
        )

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)
    })

    test('arrow right key up event on worksheet when isPortrait', () => {
        const workbook = mount(
            <Workbook isPortrait />,
            { wrappingComponent: MemoryRouter },
        )

        workbook.find('#workbook-worksheet-concentration').simulate(
            'keyup',
            { key: 'ArrowRight' },
        )

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('arrow left key up event on worksheet when isPortrait', () => {
        const workbook = mount(
            <Workbook isPortrait />,
            { wrappingComponent: MemoryRouter },
        )

        workbook.find('#workbook-worksheet-concentration').simulate(
            'keyup',
            { key: 'ArrowLeft' },
        )

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('arrow up key up event on worksheet when isPortrait', () => {
        const workbook = mount(
            <Workbook isPortrait />,
            { wrappingComponent: MemoryRouter },
        )

        workbook.find('#workbook-worksheet-concentration').simulate(
            'keyup',
            { key: 'ArrowUp' },
        )

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('arrow down key up event on worksheet when isPortrait', () => {
        const workbook = mount(
            <Workbook isPortrait />,
            { wrappingComponent: MemoryRouter },
        )

        workbook.find('#workbook-worksheet-concentration').simulate(
            'keyup',
            { key: 'ArrowDown' },
        )

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)
    })

    test('home key up event on worksheet when isPortrait', () => {
        const workbook = mount(
            <Workbook isPortrait />,
            { wrappingComponent: MemoryRouter },
        )

        workbook.find('#workbook-worksheet-concentration').simulate(
            'keyup',
            { key: 'Home' },
        )

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('end key up event on worksheet when isPortrait', () => {
        const workbook = mount(
            <Workbook isPortrait />,
            { wrappingComponent: MemoryRouter },
        )

        workbook.find('#workbook-worksheet-concentration').simulate(
            'keyup',
            { key: 'End' },
        )

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)
    })
})

describe('Workbook snapshot', () => {
    test('matches snapshot when isPortrait', () => {
        const workbook = shallow(<Workbook isPortrait />)

        expect(workbook).toMatchSnapshot()
    })

    test('matches snapshot when not isPortrait', () => {
        const workbook = shallow(<Workbook />)

        expect(workbook).toMatchSnapshot()
    })
})
