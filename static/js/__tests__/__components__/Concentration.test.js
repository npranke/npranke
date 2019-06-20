import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import { Concentration } from '../../components/Concentration'

Enzyme.configure({ adapter: new Adapter() })

describe('Concentration', () => {
    test('has matches section', () => {
        const concentration = shallow(<Concentration />)

        expect(
            concentration.find(
                '.concentration-inner .matches-wrapper .matches',
            ).exists(),
        ).toBe(true)
    })

    test('has board section', () => {
        const concentration = shallow(<Concentration />)

        expect(
            concentration.find(
                '.concentration-inner .board-wrapper .board',
            ).exists(),
        ).toBe(true)
    })
})

describe('Concentration snapshot', () => {
    test('matches snapshot', () => {
        const concentration = shallow(<Concentration />)

        expect(concentration).toMatchSnapshot()
    })
})
