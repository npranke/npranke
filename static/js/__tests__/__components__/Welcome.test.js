import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import Welcome from '@components/Welcome'

import * as utils from '@utils'

describe('Welcome', () => {
    test('sets document title', () => {
        render(
            <MemoryRouter><Welcome /></MemoryRouter>,
        )

        expect(document.title).toContain('home')
    })

    test('sends pageview', () => {
        utils.sendPageview = jest.fn()

        render(
            <MemoryRouter><Welcome /></MemoryRouter>,
        )

        expect(utils.sendPageview).toHaveBeenCalledTimes(1)
    })

    test('has intro text with welcome', () => {
        render(
            <MemoryRouter><Welcome /></MemoryRouter>,
        )

        expect(
            screen.getByRole('main'),
        ).toHaveTextContent('Welcome!')
    })

    test('has link to workbook', () => {
        render(
            <MemoryRouter><Welcome /></MemoryRouter>,
        )

        expect(
            screen.getByRole('link'),
        ).toHaveAttribute('href', '/workbook')
    })

    test('has alt text for workbook icon', () => {
        render(
            <MemoryRouter><Welcome /></MemoryRouter>,
        )

        expect(
            screen.getByRole('img'),
        ).toHaveAttribute('alt', 'Workbook icon')
    })
})

describe('Welcome snapshot', () => {
    test('matches snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter><Welcome /></MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
