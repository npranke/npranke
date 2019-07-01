import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Footer from '@components/Footer'

Enzyme.configure({ adapter: new Adapter() })

describe('Footer', () => {
    test('contains copyright symbol', () => {
        const footer = shallow(<Footer />)

        expect(
            footer.find('.copyright').text(),
        ).toMatch(/©/)
    })

    test('contains copyright year', () => {
        const footer = shallow(<Footer />)

        expect(
            footer.find('.copyright').text(),
        ).toMatch(/2019/)
    })
})

describe('Footer snapshot', () => {
    test('matches snapshot', () => {
        const footer = shallow(<Footer />)

        expect(footer).toMatchSnapshot()
    })
})
