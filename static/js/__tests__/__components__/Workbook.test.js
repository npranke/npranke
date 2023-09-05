import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import Enzyme, { shallow } from 'enzyme'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Workbook } from '@components/Workbook'

import * as utils from '@utils'

Enzyme.configure({ adapter: new Adapter() })

describe('Workbook', () => {
    beforeAll(() => {
        window.alert = jest.fn()
    })

    afterEach(() => {
        window.alert.mockReset()
    })

    test('sets document title', () => {
        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        expect(document.title).toContain('workbook')
    })

    test('sends pageview', () => {
        utils.sendPageview = jest.fn()

        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        expect(utils.sendPageview).toHaveBeenCalledTimes(1)
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

    test('has link to tower', () => {
        const workbook = shallow(<Workbook />)

        expect(
            workbook.find('#workbook-worksheet-tower Link').props().to,
        ).toEqual('/workbook/tower')
    })

    test('has alt text for tower icon', () => {
        const workbook = shallow(<Workbook />)

        expect(
            workbook.find('#workbook-worksheet-tower img').props().alt,
        ).toEqual('Tower icon')
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

    test('opens worksheet alert with spacebar', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        await user.tab()
        await user.tab()
        await user.tab()

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)

        await user.keyboard(' ')

        expect(window.alert).toHaveBeenCalled()
    })

    test('moves focus with right arrow when not isPortrait', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        await user.tab()
        await user.keyboard('{ArrowRight}')

        expect(
            document.activeElement.href.endsWith('tower'),
        ).toBe(true)

        await user.keyboard('{ArrowRight}')

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)

        await user.keyboard('{ArrowRight}')

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)
    })

    test('moves focus with left arrow when not isPortrait', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        await user.tab()
        await user.keyboard('{ArrowLeft}')

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('moves focus with up arrow when not isPortrait', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        await user.tab()
        await user.keyboard('{ArrowUp}')

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('moves focus with down arrow when not isPortrait', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        await user.tab()
        await user.keyboard('{ArrowDown}')

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('moves focus with home key when not isPortrait', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        await user.tab()
        await user.keyboard('{Home}')

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)

        await user.tab()

        expect(
            document.activeElement.href.endsWith('tower'),
        ).toBe(true)

        await user.keyboard('{Home}')

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)

        await user.tab()
        await user.tab()

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)

        await user.keyboard('{Home}')

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('moves focus with end key when not isPortrait', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        await user.tab()
        await user.keyboard('{End}')

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)

        await user.keyboard('{Home}')
        await user.tab()

        expect(
            document.activeElement.href.endsWith('tower'),
        ).toBe(true)

        await user.keyboard('{End}')

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)

        await user.keyboard('{Home}')
        await user.tab()
        await user.tab()

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)

        await user.keyboard('{End}')

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)
    })

    test('moves focus with right arrow when isPortrait', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook isPortrait /></MemoryRouter>,
        )

        await user.tab()
        await user.keyboard('{ArrowRight}')

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('moves focus with left arrow when isPortrait', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook isPortrait /></MemoryRouter>,
        )

        await user.tab()
        await user.keyboard('{ArrowLeft}')

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('moves focus with up arrow when isPortrait', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook isPortrait /></MemoryRouter>,
        )

        await user.tab()
        await user.keyboard('{ArrowUp}')

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('moves focus with down arrow when isPortrait', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook isPortrait /></MemoryRouter>,
        )

        await user.tab()
        await user.keyboard('{ArrowDown}')

        expect(
            document.activeElement.href.endsWith('tower'),
        ).toBe(true)

        await user.keyboard('{ArrowDown}')

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)

        await user.keyboard('{ArrowDown}')

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)
    })

    test('moves focus with home key when isPortrait', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook isPortrait /></MemoryRouter>,
        )

        await user.tab()
        await user.keyboard('{Home}')

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)

        await user.tab()

        expect(
            document.activeElement.href.endsWith('tower'),
        ).toBe(true)

        await user.keyboard('{Home}')

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)

        await user.tab()
        await user.tab()

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)

        await user.keyboard('{Home}')

        expect(
            document.activeElement.href.endsWith('concentration'),
        ).toBe(true)
    })

    test('moves focus with end key when isPortrait', async () => {
        const user = userEvent.setup()

        render(
            <MemoryRouter><Workbook isPortrait /></MemoryRouter>,
        )

        await user.tab()
        await user.keyboard('{End}')

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)

        await user.keyboard('{Home}')
        await user.tab()

        expect(
            document.activeElement.href.endsWith('tower'),
        ).toBe(true)

        await user.keyboard('{End}')

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)

        await user.keyboard('{Home}')
        await user.tab()
        await user.tab()

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)

        await user.keyboard('{End}')

        expect(
            document.activeElement.href.endsWith('workbook'),
        ).toBe(true)
    })
})

describe('Workbook snapshot', () => {
    test('matches snapshot when isPortrait', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <Workbook isPortrait />
            </MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    test('matches snapshot when not isPortrait', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <Workbook />
            </MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
