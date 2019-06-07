import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Home from '../Home'

Enzyme.configure({ adapter: new Adapter() })

describe('Home', () => {
    test('has intro text', () => {
        const home = shallow(<Home />)

        expect(
            home.find('.intro').text(),
        ).toBeTruthy()
    })

    test('has link to workbook', () => {
        const home = shallow(<Home />)

        expect(
            home.find('.button-workbook a').props().href,
        ).toEqual('mock-base-url')
    })

    test('has alt text for workbook icon', () => {
        const home = shallow(<Home />)

        expect(
            home.find('.button-workbook img').props().alt,
        ).toEqual('Workbook icon')
    })
})

describe('Home snapshot', () => {
    test('matches snapshot', () => {
        const home = shallow(<Home />)

        expect(home).toMatchSnapshot()
    })
})
