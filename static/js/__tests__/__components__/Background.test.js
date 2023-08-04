import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'
import {render, screen} from '@testing-library/react'

import Background from '@components/Background'

Enzyme.configure({ adapter: new Adapter() })

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
        const background = shallow(<Background />)

        expect(background).toMatchSnapshot()
    })
})
