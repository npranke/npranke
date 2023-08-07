import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'
import { render } from '@testing-library/react'

import PageNotFound from '@components/PageNotFound'

import * as utils from '@utils'

Enzyme.configure({ adapter: new Adapter() })

describe('PageNotFound', () => {
    test('sets document title', () => {
        shallow(<PageNotFound />)

        expect(document.title).toContain('pagenotfound')
    })

    test('sends pageview', () => {
        utils.sendPageview = jest.fn()

        shallow(<PageNotFound />)

        expect(utils.sendPageview).toHaveBeenCalledTimes(1)
    })

    test('has intro text with oops', () => {
        const pageNotFound = shallow(<PageNotFound />)

        expect(
            pageNotFound.find('.intro').text(),
        ).toContain('Oops!')
    })

    test('has link to home', () => {
        const pageNotFound = shallow(<PageNotFound />)

        expect(
            pageNotFound.find('.button-home a').props().href,
        ).toEqual('/home')
    })

    test('has alt text for home icon', () => {
        const pageNotFound = shallow(<PageNotFound />)

        expect(
            pageNotFound.find('.button-home img').props().alt,
        ).toEqual('Home icon')
    })
})

describe('PageNotFound snapshot', () => {
    test('matches snapshot', () => {
        const { asFragment } = render(<PageNotFound />)

        expect(asFragment()).toMatchSnapshot()
    })
})
