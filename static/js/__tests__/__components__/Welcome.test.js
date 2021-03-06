import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Welcome from '@components/Welcome'

import * as utils from '@utils'

Enzyme.configure({ adapter: new Adapter() })

describe('Welcome', () => {
    test('sets document title', () => {
        shallow(<Welcome />)

        expect(document.title).toContain('home')
    })

    test('sends pageview', () => {
        utils.sendPageview = jest.fn()

        shallow(<Welcome />)

        expect(utils.sendPageview).toHaveBeenCalledTimes(1)
    })

    test('has intro text with welcome', () => {
        const welcome = shallow(<Welcome />)

        expect(
            welcome.find('.intro').text(),
        ).toContain('Welcome!')
    })

    test('has link to workbook', () => {
        const welcome = shallow(<Welcome />)

        expect(
            welcome.find('.button-workbook Link').props().to,
        ).toEqual('/workbook')
    })

    test('has alt text for workbook icon', () => {
        const welcome = shallow(<Welcome />)

        expect(
            welcome.find('.button-workbook img').props().alt,
        ).toEqual('Workbook icon')
    })
})

describe('Welcome snapshot', () => {
    test('matches snapshot', () => {
        const welcome = shallow(<Welcome />)

        expect(welcome).toMatchSnapshot()
    })
})
