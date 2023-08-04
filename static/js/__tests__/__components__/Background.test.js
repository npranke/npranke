import React from 'react'
import { render, screen } from '@testing-library/react'
import renderer from 'react-test-renderer'

import Background from '@components/Background'

describe('Background', () => {
    test('has img with nonempty alt text', () => {
        render(<Background />)

        const backgroundImg = screen.getByRole('img')

        expect(backgroundImg).toBeInTheDocument()
        expect(backgroundImg).toHaveAttribute('alt')
        expect(backgroundImg).not.toHaveAttribute('alt', '')
    })
})

describe('Background snapshot', () => {
    test('matches snapshot', () => {
        const background = renderer.create(<Background />).toJSON()

        expect(background).toMatchSnapshot()
    })
})
