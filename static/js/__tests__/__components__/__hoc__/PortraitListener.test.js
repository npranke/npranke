import { render, screen } from '@testing-library/react'

import ComponentPortraitListenerHOCMock from
    '@__mocks__/ComponentPortraitListenerHOCMock'

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
        window.matchMedia().matches = true

        const WrappedComponent = withPortraitListener(
            ComponentPortraitListenerHOCMock,
        )

        render(<WrappedComponent />)

        expect(
            screen.getByRole('document'),
        ).toHaveTextContent('true')
    })

    test('adds listener on mounting', () => {
        const WrappedComponent = withPortraitListener(
            ComponentPortraitListenerHOCMock,
        )

        render(<WrappedComponent />)

        expect(
            window.matchMedia().addEventListener,
        ).toHaveBeenCalledTimes(1)
    })

    test('removes listener on unmounting', () => {
        const WrappedComponent = withPortraitListener(
            ComponentPortraitListenerHOCMock,
        )

        const { unmount } = render(<WrappedComponent />)

        unmount()

        expect(
            window.matchMedia().removeEventListener,
        ).toHaveBeenCalledTimes(1)
    })
})

describe('PortraitListener snapshot', () => {
    test('matches snapshot', () => {
        const WrappedComponent = withPortraitListener(
            ComponentPortraitListenerHOCMock,
        )

        const { asFragment } = render(<WrappedComponent />)

        expect(asFragment()).toMatchSnapshot()
    })
})
