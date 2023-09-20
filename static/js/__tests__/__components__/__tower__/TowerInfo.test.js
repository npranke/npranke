import { render, screen } from '@testing-library/react'

import TowerInfo from '@components/tower/TowerInfo'

describe('TowerInfo', () => {
    test('has basic description text', () => {
        render(<TowerInfo />)

        expect(
            screen.getByText(/Tower of Hanoi puzzle/),
        ).toBeInTheDocument()
    })

    test('has image credit text', () => {
        render(<TowerInfo />)

        expect(
            screen.getByText(/courtesy of NASA\/JPL-Caltech/),
        ).toBeInTheDocument()
    })

    test('has link to nasa solar system exploration program jupiter', () => {
        render(<TowerInfo />)

        expect(
            screen.getByRole(
                'link',
                { name: 'NASA’s Solar System Exploration Program' },
            ),
        ).toHaveAttribute(
            'href',
            'https://solarsystem.nasa.gov/planets/jupiter/overview/',
        )
    })

    test('has link to jpl image gallery', () => {
        render(<TowerInfo />)

        expect(
            screen.getByRole('link', { name: 'JPL Image Gallery' }),
        ).toHaveAttribute('href', 'https://www.jpl.nasa.gov/images')
    })
})

describe('TowerInfo snapshot', () => {
    test('matches snapshot', () => {
        const { asFragment } = render(<TowerInfo />)

        expect(asFragment()).toMatchSnapshot()
    })
})
