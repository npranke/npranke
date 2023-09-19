import { render, screen } from '@testing-library/react'

import Footer from '@components/Footer'

describe('Footer', () => {
    test('contains copyright symbol', () => {
        render(<Footer />)

        expect(
            screen.getByRole('contentinfo'),
        ).toHaveTextContent(/^©/)
    })

    test('contains copyright years', () => {
        render(<Footer />)

        expect(
            screen.getByRole('contentinfo'),
        ).toHaveTextContent(/2017/)
        expect(
            screen.getByRole('contentinfo'),
        ).toHaveTextContent(/2023/)
    })
})

describe('Footer snapshot', () => {
    test('matches snapshot', () => {
        const { asFragment } = render(<Footer />)

        expect(asFragment()).toMatchSnapshot()
    })
})
