import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount, shallow } from 'enzyme'
import React from 'react'

import { sendEvent } from '../../utils'
import Workbook from '../../components/Workbook'

jest.mock('../../utils')

Enzyme.configure({ adapter: new Adapter() })

describe('Workbook', () => {
    beforeAll(() => {
        window.alert = jest.fn()
    })

    beforeEach(() => {
        window.matchMedia = jest.fn().mockReturnValue({
            matches: false,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
        })
    })

    afterEach(() => {
        window.alert.mockReset()
    })

    test('has multiple rows when portrait', () => {
        const workbook = shallow(<Workbook />)
        workbook.setState({ isPortrait: true })

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

    test('sendEvent is called on click event', () => {
        const workbook = mount(<Workbook />)

        workbook.find('#workbook-worksheet-a').simulate('click')

        expect(
            sendEvent,
        ).toHaveBeenNthCalledWith(
            1,
            'workbook',
            'navigate',
            'worksheet a',
        )
    })

    test('sendEvent is called on enter key up event', () => {
        const workbook = mount(<Workbook />)

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'Enter' },
        )

        expect(
            sendEvent,
        ).toHaveBeenNthCalledWith(
            1,
            'workbook',
            'navigate',
            'worksheet a',
        )
    })

    test('sendEvent is called on spacebar key up event', () => {
        const workbook = mount(<Workbook />)

        workbook.find('#workbook-worksheet-a').simulate('keyup', { key: ' ' })

        expect(
            sendEvent,
        ).toHaveBeenNthCalledWith(
            1,
            'workbook',
            'navigate',
            'worksheet a',
        )
    })

    test('arrow right key up event on worksheet a when not isPortrait', () => {
        const workbook = mount(<Workbook />)

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'ArrowRight' },
        )

        expect(
            document.activeElement.id,
        ).toEqual('workbook-worksheet-b')
    })

    test('arrow left key up event on worksheet a when not isPortrait', () => {
        const workbook = mount(<Workbook />)

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'ArrowLeft' },
        )

        expect(
            document.activeElement.id,
        ).toEqual('workbook-worksheet-a')
    })

    test('arrow up key up event on worksheet a when not isPortrait', () => {
        const workbook = mount(<Workbook />)

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'ArrowUp' },
        )

        expect(
            document.activeElement.id,
        ).toEqual('workbook-worksheet-a')
    })

    test('arrow down key up event on worksheet a when not isPortrait', () => {
        const workbook = mount(<Workbook />)

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'ArrowDown' },
        )

        expect(
            document.activeElement.id,
        ).toEqual('workbook-worksheet-a')
    })

    test('home key up event on worksheet a when not isPortrait', () => {
        const workbook = mount(<Workbook />)

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'Home' },
        )

        expect(
            document.activeElement.id,
        ).toEqual('workbook-worksheet-a')
    })

    test('end key up event on worksheet a when not isPortrait', () => {
        const workbook = mount(<Workbook />)

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'End' },
        )

        expect(
            document.activeElement.id,
        ).toEqual('workbook-worksheet-b')
    })

    test('arrow right key up event on worksheet a when isPortrait', () => {
        const workbook = mount(<Workbook />)
        workbook.setState({ isPortrait: true })

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'ArrowRight' },
        )

        expect(
            document.activeElement.id,
        ).toEqual('workbook-worksheet-a')
    })

    test('arrow left key up event on worksheet a when isPortrait', () => {
        const workbook = mount(<Workbook />)
        workbook.setState({ isPortrait: true })

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'ArrowLeft' },
        )

        expect(
            document.activeElement.id,
        ).toEqual('workbook-worksheet-a')
    })

    test('arrow up key up event on worksheet a when isPortrait', () => {
        const workbook = mount(<Workbook />)
        workbook.setState({ isPortrait: true })

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'ArrowUp' },
        )

        expect(
            document.activeElement.id,
        ).toEqual('workbook-worksheet-a')
    })

    test('arrow down key up event on worksheet a when isPortrait', () => {
        const workbook = mount(<Workbook />)
        workbook.setState({ isPortrait: true })

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'ArrowDown' },
        )

        expect(
            document.activeElement.id,
        ).toEqual('workbook-worksheet-b')
    })

    test('home key up event on worksheet a when isPortrait', () => {
        const workbook = mount(<Workbook />)
        workbook.setState({ isPortrait: true })

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'Home' },
        )

        expect(
            document.activeElement.id,
        ).toEqual('workbook-worksheet-a')
    })

    test('end key up event on worksheet a when isPortrait', () => {
        const workbook = mount(<Workbook />)
        workbook.setState({ isPortrait: true })

        workbook.find('#workbook-worksheet-a').simulate(
            'keyup',
            { key: 'End' },
        )

        expect(
            document.activeElement.id,
        ).toEqual('workbook-worksheet-b')
    })
})

describe('Workbook snapshot', () => {
    test('matches snapshot', () => {
        window.matchMedia = jest.fn().mockReturnValue({
            matches: false,
            addEventListener: jest.fn(),
        })

        const workbook = shallow(<Workbook />)

        expect(workbook).toMatchSnapshot()
    })
})
