import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Workbook } from '@components/Workbook'

import * as utils from '@utils'

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
        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        expect(
            screen.getByRole('link', { name: 'Concentration' }),
        ).toHaveAttribute('href', '/workbook/concentration')
    })

    test('has alt text for concentration icon', () => {
        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        expect(
            screen.getByRole('img', { name: 'Concentration icon' }),
        ).toHaveAttribute('alt', 'Concentration icon')
    })

    test('has link to tower', () => {
        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        expect(
            screen.getByRole('link', { name: 'Tower' }),
        ).toHaveAttribute('href', '/workbook/tower')
    })

    test('has alt text for tower icon', () => {
        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        expect(
            screen.getByRole('img', { name: 'Tower icon' }),
        ).toHaveAttribute('alt', 'Tower icon')
    })

    test('has multiple rows when portrait', () => {
        render(
            <MemoryRouter><Workbook isPortrait /></MemoryRouter>,
        )

        expect(
            screen.getAllByRole('row').length,
        ).toBeGreaterThan(1)
    })

    test('has one row when not portrait', () => {
        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        expect(
            screen.getAllByRole('row'),
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
            <MemoryRouter><Workbook isPortrait /></MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })

    test('matches snapshot when not isPortrait', () => {
        const { asFragment } = render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
