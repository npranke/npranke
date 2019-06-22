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
                '.concentration-inner .matches-wrapper ConcentrationMatches',
            ).exists(),
        ).toBe(true)
    })

    test('has board section', () => {
        const concentration = shallow(<Concentration />)

        expect(
            concentration.find(
                '.concentration-inner .board-wrapper ConcentrationBoard',
            ).exists(),
        ).toBe(true)
    })
})

describe('Concentration snapshot', () => {
    test('matches snapshot', () => {
        const concentration = shallow(<Concentration />)

        concentration.instance().boardOrder = [
            'picture0-a',
            'picture0-b',
            'picture1-a',
            'picture1-b',
            'picture2-a',
            'picture2-b',
            'picture3-a',
            'picture3-b',
            'picture4-a',
            'picture4-b',
            'picture5-a',
            'picture5-b',
            'picture6-a',
            'picture6-b',
            'picture7-a',
            'picture7-b',
            'picture8-a',
            'picture8-b',
            'picture9-a',
            'picture9-b',
            'picture10-a',
            'picture10-b',
            'picture11-a',
            'picture11-b',
        ]

        expect(concentration.instance().render()).toMatchSnapshot()
    })
})
