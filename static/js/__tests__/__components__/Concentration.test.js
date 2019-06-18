import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import Concentration from '../../components/Concentration'

Enzyme.configure({ adapter: new Adapter() })

describe('Concentration', () => {
    test('has text with concentration', () => {
        const concentration = shallow(<Concentration />)

        expect(
            concentration.find('.concentration').text(),
        ).toContain('concentration')
    })
})

describe('Concentration snapshot', () => {
    test('matches snapshot', () => {
        const concentration = shallow(<Concentration />)

        expect(concentration).toMatchSnapshot()
    })
})
