import {
    getLocationPageTitle,
    getSendEventHandler,
    sendEvent,
    sendPageview,
} from '@utils'

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
        afterEach(() => {
            window.gtag.mockReset()
        })

        test('getSendEventHandler returns function with value arg', () => {
            const sendEventHandler = getSendEventHandler(
                'category',
                'action',
                'label',
                0,
            )

            expect(
                sendEventHandler,
            ).toBeInstanceOf(Function)
        })

        test('getSendEventHandler returns function without value arg', () => {
            const sendEventHandler = getSendEventHandler(
                'category',
                'action',
                'label',
            )

            expect(
                sendEventHandler,
            ).toBeInstanceOf(Function)
        })


        test('sendEvent calls gtag() with value arg', () => {
            sendEvent('category', 'action', 'label', 0)

            expect(
                window.gtag,
            ).toHaveBeenNthCalledWith(
                1,
                'event',
                'action',
                {
                    event_category: 'category',
                    event_label: 'label',
                    value: 0,
                },
            )
        })

        test('sendEvent calls gtag() without value arg', () => {
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

    describe('send pageview util', () => {
        afterEach(() => {
            window.gtag.mockReset()
        })

        test('sendPageview calls gtag()', () => {
            document.title = 'pagetitle'

            sendPageview()

            expect(
                window.gtag,
            ).toHaveBeenNthCalledWith(
                1,
                'config',
                'mock-ga',
                {
                    page_title: 'pagetitle',
                    page_path: '/',
                    page_location: 'http://localhost/',
                },
            )
        })
    })
})
