import { render, screen } from '@testing-library/react'

import ConcentrationInfo from '@components/concentration/ConcentrationInfo'

describe('ConcentrationInfo', () => {
    test('has basic description text', () => {
        render(<ConcentrationInfo />)

        expect(
            screen.getByText(/picture matching memory game/),
        ).toBeInTheDocument()
    })

    test('has image credit text', () => {
        render(<ConcentrationInfo />)

        expect(
            screen.getByText(/courtesy of NASA\/JPL-Caltech/),
        ).toBeInTheDocument()
    })

    test('has link to nasa mars exploration program', () => {
        render(<ConcentrationInfo />)

        expect(
            screen.getByRole(
                'link',
                { name: 'NASA’s Mars Exploration Program' },
            ),
        ).toHaveAttribute('href', 'https://mars.nasa.gov')
    })

    test('has link to jpl image gallery', () => {
        render(<ConcentrationInfo />)

        expect(
            screen.getByRole('link', { name: 'JPL Image Gallery' }),
        ).toHaveAttribute('href', 'https://www.jpl.nasa.gov/images')
    })
})

describe('ConcentrationInfo snapshot', () => {
    test('matches snapshot', () => {
        const { asFragment } = render(
            <ConcentrationInfo />,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
