import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount } from 'enzyme'
import React from 'react'

import ComponentMock from '@__mocks__/ComponentMock'

import withPortraitListener from '@components/hoc/PortraitListener'

Enzyme.configure({ adapter: new Adapter() })

describe('PortraitListener', () => {
    beforeEach(() => {
        window.matchMedia = jest.fn().mockReturnValue({
            matches: false,
            addListener: jest.fn(),
            removeListener: jest.fn(),
        })
    })

    test('wrapped component has isPortrait prop', () => {
        const WrappedComponent = withPortraitListener(ComponentMock)

        const wrappedComponent = mount(<WrappedComponent />)

        expect(
            wrappedComponent.find('ComponentMock').props().isPortrait,
        ).toBeDefined()
    })
})

describe('PortraitListener snapshot', () => {
    test('matches snapshot', () => {
        const WrappedComponent = withPortraitListener(ComponentMock)

        const wrappedComponent = mount(<WrappedComponent />)

        expect(wrappedComponent).toMatchSnapshot()
    })
})
