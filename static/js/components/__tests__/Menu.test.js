import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Menu from '../Menu'

Enzyme.configure({ adapter: new Adapter() })

describe('Menu', () => {
    test('has intro text', () => {
        const menu = shallow(<Menu />)

        expect(
            menu.find('.intro').text(),
        ).toBeTruthy()
    })

    test('has link to workbook', () => {
        const menu = shallow(<Menu />)

        expect(
            menu.find('.button-workbook a').props().href,
        ).toEqual('mock-base-url')
    })

    test('has alt text for workbook icon', () => {
        const menu = shallow(<Menu />)

        expect(
            menu.find('.button-workbook img').props().alt,
        ).toEqual("Workbook icon")
    })
})

describe('Menu snapshot', () => {
    test('matches snapshot', () => {
        const menu = shallow(<Menu />)

        expect(menu).toMatchSnapshot()
    })
})
