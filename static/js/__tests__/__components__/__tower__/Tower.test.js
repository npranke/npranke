import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import { Tower } from '@components/tower/Tower'

import * as utils from '@utils'

Enzyme.configure({ adapter: new Adapter() })

describe('Tower', () => {
    test('has settings section', () => {
        const tower = shallow(<Tower />)

        expect(
            tower.find(
                '.tower .settings-wrapper TowerSettings',
            ).exists(),
        ).toBe(true)
    })

    test('updateDiscs() sets updated discs', () => {
        const tower = shallow(<Tower />)

        tower.instance().updateDiscs('5')

        expect(
            tower.state('discs'),
        ).toBe(5)
    })

    describe('sending tower events', () => {
        beforeAll(() => {
            utils.sendEvent = jest.fn()
        })

        afterEach(() => {
            utils.sendEvent.mockReset()
        })

        test('when discs is updated', () => {
            const tower = shallow(<Tower />)

            tower.instance().updateDiscs('2')

            expect(
                utils.sendEvent,
            ).toHaveBeenNthCalledWith(
                1,
                'tower',
                'select',
                'discs-2',
            )
        })
    })
})

describe('Tower snapshot', () => {
    test('matches snapshot', () => {
        const tower = shallow(<Tower />)

        expect(tower).toMatchSnapshot()
    })
})
