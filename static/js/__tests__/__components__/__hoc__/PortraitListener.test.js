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

        expect(
            screen.getByRole('document'),
        ).toHaveTextContent('isPortrait false')
    })

    test('isPortrait prop true when orientation matches', () => {
        window.matchMedia().matches = true

        const WrappedComponent = withPortraitListener(ComponentMock)

        render(<WrappedComponent />)

        expect(
            screen.getByRole('document'),
        ).toHaveTextContent('isPortrait true')
    })

    test('adds listener on mounting', () => {
        const WrappedComponent = withPortraitListener(ComponentMock)

        render(<WrappedComponent />)

        expect(
            window.matchMedia().addEventListener,
        ).toHaveBeenCalledTimes(1)
    })

    test('removes listener on unmounting', () => {
        const WrappedComponent = withPortraitListener(ComponentMock)

        const { unmount } = render(<WrappedComponent />)

        unmount()

        expect(
            window.matchMedia().removeEventListener,
        ).toHaveBeenCalledTimes(1)
    })
})

describe('PortraitListener snapshot', () => {
    test('matches snapshot', () => {
        const WrappedComponent = withPortraitListener(ComponentMock)

        const { asFragment } = render(<WrappedComponent />)

        expect(asFragment()).toMatchSnapshot()
    })
})
