import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Background from '@components/Background'

Enzyme.configure({ adapter: new Adapter() })

describe('Background', () => {
    test('has alt attribute', () => {
        const background = shallow(<Background />)

        expect(
            background.find('.background').props().alt,
        ).toBeTruthy()
    })
})

describe('Background snapshot', () => {
    test('matches snapshot', () => {
        const background = shallow(<Background />)

        expect(background).toMatchSnapshot()
    })
})
