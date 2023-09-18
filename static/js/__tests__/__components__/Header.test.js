import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import Header from '@components/Header'

describe('Header', () => {
    test('has navlink to home', () => {
        render(
            <MemoryRouter><Header /></MemoryRouter>,
        )

        expect(
            screen.getByRole('link', { name: 'Home' }),
        ).toHaveAttribute('href', '/home')
    })

    test('has navlink to workbook', () => {
        render(
            <MemoryRouter><Header /></MemoryRouter>,
        )

        expect(
            screen.getByRole('link', { name: 'Workbook' }),
        ).toHaveAttribute('href', '/workbook')
    })

    test('has link to github profile', () => {
        render(
            <MemoryRouter><Header /></MemoryRouter>,
        )

        expect(
            screen.getByRole('link', { name: 'GitHub' }),
        ).toHaveAttribute('href', 'https://github.com/npranke')
    })

    test('has link to linkedin profile', () => {
        render(
            <MemoryRouter><Header /></MemoryRouter>,
        )

        expect(
            screen.getByRole('link', { name: 'LinkedIn' }),
        ).toHaveAttribute('href', 'https://www.linkedin.com/in/npranke')
    })

    test('has alt text for home icon', () => {
        render(
            <MemoryRouter><Header /></MemoryRouter>,
        )

        expect(
            screen.getByRole('img', { name: 'Home icon' }),
        ).toHaveAttribute('alt', 'Home icon')
    })

    test('has alt text for workbook icon', () => {
        render(
            <MemoryRouter><Header /></MemoryRouter>,
        )

        expect(
            screen.getByRole('img', { name: 'Workbook icon' }),
        ).toHaveAttribute('alt', 'Workbook icon')
    })

    test('has alt text for github icon', () => {
        render(
            <MemoryRouter><Header /></MemoryRouter>,
        )

        expect(
            screen.getByRole('img', { name: 'GitHub icon' }),
        ).toHaveAttribute('alt', 'GitHub icon')
    })

    test('has alt text for linkedin icon', () => {
        render(
            <MemoryRouter><Header /></MemoryRouter>,
        )

        expect(
            screen.getByRole('img', { name: 'LinkedIn icon' }),
        ).toHaveAttribute('alt', 'LinkedIn icon')
    })
})

describe('Header snapshot', () => {
    test('matches snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter><Header /></MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
