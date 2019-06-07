import { getSendEventHandler, sendEvent } from '../utils'

describe('utils', () => {
    beforeAll(() => {
        window.gtag = jest.fn()
    })

    afterEach(() => {
        window.gtag.mockReset()
    })

    test('getSendEventHandler returns a function', () => {
        const sendEventHandler = getSendEventHandler(
            'category',
            'action',
            'label',
        )

        expect(
            sendEventHandler,
        ).toBeInstanceOf(Function)
    })

    test('sendEvent calls gtag()', () => {
        sendEvent('category', 'action', 'label')

        expect(
            window.gtag,
        ).toHaveBeenNthCalledWith(
            1,
            'event',
            'action',
            {
                event_category: 'category',
                event_label: 'label',
            },
        )
    })
})
