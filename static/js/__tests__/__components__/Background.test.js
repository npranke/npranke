import { render, screen } from '@testing-library/react'

import Background from '@components/Background'

describe('Background', () => {
    test('has img with nonempty alt text', () => {
        render(<Background />)

        expect(
            screen.getByRole('img'),
        ).toHaveAttribute('alt')
        expect(
            screen.getByRole('img'),
        ).not.toHaveAttribute('alt', '')
    })
})

describe('Background snapshot', () => {
    test('matches snapshot', () => {
        const { asFragment } = render(<Background />)

        expect(asFragment()).toMatchSnapshot()
    })
})
