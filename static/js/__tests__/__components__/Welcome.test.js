import Adapter from 'enzyme-adapter-react-16'
import { CompatRouter } from 'react-router-dom-v5-compat'
import Enzyme, { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { render } from '@testing-library/react'

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
        const { asFragment } = render(
            <MemoryRouter>
                <CompatRouter>
                    <Welcome />
                </CompatRouter>
            </MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
