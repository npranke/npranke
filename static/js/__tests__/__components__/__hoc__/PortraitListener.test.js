import { render, screen } from '@testing-library/react'

import ComponentMock from '@__mocks__/ComponentMock'

import withPortraitListener from '@components/hoc/PortraitListener'

window.matchMedia = jest.fn().mockReturnValue({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
})

describe('PortraitListener', () => {
    beforeEach(() => {
        window.matchMedia().matches = false
        window.matchMedia().addEventListener.mockReset()
        window.matchMedia().removeEventListener.mockReset()
    })

    test('wrapped component can access isPortrait prop', () => {
        const WrappedComponent = withPortraitListener(ComponentMock)

        render(<WrappedComponent />)

        const wrappedComponent = screen.getByRole('document')

        expect(wrappedComponent).toHaveTextContent('isPortrait false')
    })
})

describe('PortraitListener snapshot', () => {
    test('matches snapshot', () => {
        const WrappedComponent = withPortraitListener(ComponentMock)

        const { asFragment } = render(<WrappedComponent />)

        expect(asFragment()).toMatchSnapshot()
    })
})
