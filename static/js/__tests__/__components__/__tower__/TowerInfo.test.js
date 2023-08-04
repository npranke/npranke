import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import TowerInfo from '@components/tower/TowerInfo'

Enzyme.configure({ adapter: new Adapter() })

describe('TowerInfo', () => {
    test('has basic description text', () => {
        const towerInfo = shallow(<TowerInfo />)

        expect(
            towerInfo.find('.tower-info').text(),
        ).toContain('Tower of Hanoi puzzle')
    })

    test('has image credit text', () => {
        const towerInfo = shallow(<TowerInfo />)

        expect(
            towerInfo.find('.tower-info').text(),
        ).toContain('courtesy of NASA/JPL-Caltech')
    })

    test('has link to nasa solar system exploration program jupiter', () => {
        const towerInfo = shallow(<TowerInfo />)

        expect(
            towerInfo.find(
                '.tower-info a',
            ).first().props().href,
        ).toEqual('https://solarsystem.nasa.gov/planets/jupiter/overview/')
    })

    test('has link to jpl image gallery', () => {
        const towerInfo = shallow(<TowerInfo />)

        expect(
            towerInfo.find(
                '.tower-info a',
            ).last().props().href,
        ).toEqual('https://www.jpl.nasa.gov/images')
    })
})

describe('TowerInfo snapshot', () => {
    test('matches snapshot', () => {
        const towerInfo = renderer.create(<TowerInfo />).toJSON()

        expect(towerInfo).toMatchSnapshot()
    })
})
