import { getLocationPageTitle, getSendEventHandler, sendEvent } from '@utils'

describe('utils', () => {
    describe('location page title util', () => {
        test('getLocationPageTitle sets title from index', () => {
            document.title = 'npranke'

            const locationPageTitle = getLocationPageTitle('home')

            expect(locationPageTitle).toEqual('home | npranke')
        })

        test('getLocationPageTitle sets title from location', () => {
            document.title = 'home | npranke'

            const locationPageTitle = getLocationPageTitle('workbook')

            expect(locationPageTitle).toEqual('workbook | npranke')
        })
    })

    describe('send event utils', () => {
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
})
