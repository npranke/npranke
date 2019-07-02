import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import ConcentrationInfo from '@components/concentration/ConcentrationInfo'

Enzyme.configure({ adapter: new Adapter() })

describe('ConcentrationInfo', () => {
    test('has basic description text', () => {
        const concentrationInfo = shallow(<ConcentrationInfo />)

        expect(
            concentrationInfo.find('.concetration-info').text(),
        ).toContain('picture matching memory game')
    })

    test('has image credit text', () => {
        const concentrationInfo = shallow(<ConcentrationInfo />)

        expect(
            concentrationInfo.find('.concetration-info').text(),
        ).toContain('courtesy of NASA/JPL-Caltech')
    })

    test('has link to nasa mars exploration program', () => {
        const concentrationInfo = shallow(<ConcentrationInfo />)

        expect(
            concentrationInfo.find(
                '.concetration-info a',
            ).first().props().href,
        ).toEqual('https://mars.nasa.gov')
    })

    test('has link to jpl space images gallery', () => {
        const concentrationInfo = shallow(<ConcentrationInfo />)

        expect(
            concentrationInfo.find(
                '.concetration-info a',
            ).last().props().href,
        ).toEqual('https://www.jpl.nasa.gov/spaceimages/')
    })
})

describe('ConcentrationInfo snapshot', () => {
    test('matches snapshot', () => {
        const concentrationInfo = shallow(<ConcentrationInfo />)

        expect(concentrationInfo).toMatchSnapshot()
    })
})
