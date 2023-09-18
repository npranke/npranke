import { render, screen } from '@testing-library/react'

import PageNotFound from '@components/PageNotFound'

import * as utils from '@utils'

describe('PageNotFound', () => {
    test('sets document title', () => {
        render(<PageNotFound />)

        expect(document.title).toContain('pagenotfound')
    })

    test('sends pageview', () => {
        utils.sendPageview = jest.fn()

        render(<PageNotFound />)

        expect(utils.sendPageview).toHaveBeenCalledTimes(1)
    })

    test('has intro text with oops', () => {
        render(<PageNotFound />)

        expect(
            screen.getByRole('main'),
        ).toHaveTextContent('Oops!')
    })

    test('has link to home', () => {
        render(<PageNotFound />)

        expect(
            screen.getByRole('link'),
        ).toHaveAttribute('href', '/home')
    })

    test('has alt text for home icon', () => {
        render(<PageNotFound />)

        expect(
            screen.getByRole('img'),
        ).toHaveAttribute('alt', 'Home icon')
    })
})

describe('PageNotFound snapshot', () => {
    test('matches snapshot', () => {
        const { asFragment } = render(<PageNotFound />)

        expect(asFragment()).toMatchSnapshot()
    })
})
