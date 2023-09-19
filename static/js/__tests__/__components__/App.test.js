import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import App from '@components/App'
import Background from '@components/Background'
import Footer from '@components/Footer'
import Header from '@components/Header'
import PageNotFound from '@components/PageNotFound'
import Welcome from '@components/Welcome'
import { Workbook } from '@components/Workbook'
import WorksheetContainer from '@components/WorksheetContainer'

import worksheets from '@constants/worksheets'

const mockLocation = { hash: '' }

jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
        useLocation: jest.fn(() => { return mockLocation }),
    }
})
jest.mock('@components/hoc/PortraitListener', () => {
    return {
        __esModule: true,
        default: (component) => { return component },
    }
})
jest.mock('@components/concentration/Concentration')
jest.mock('@components/tower/Tower')

const { CONCENTRATION, TOWER } = worksheets

describe('App', () => {
    beforeEach(() => {
        mockLocation.hash = ''
    })

    test('contains background', () => {
        const { unmount } = render(
            <MemoryRouter><App /></MemoryRouter>,
        )
        const backgroundHTML = screen.getAllByRole('img')[0].outerHTML

        unmount()

        render(<Background />)
        const expectedHTML = screen.getByRole('img').outerHTML

        expect(backgroundHTML).toEqual(expectedHTML)
    })

    test('contains header', () => {
        const { unmount } = render(
            <MemoryRouter><App /></MemoryRouter>,
        )
        const headerHTML = screen.getByRole('navigation').outerHTML

        unmount()

        render(
            <MemoryRouter><Header /></MemoryRouter>,
        )
        const expectedHTML = screen.getByRole('navigation').outerHTML

        expect(headerHTML).toEqual(expectedHTML)
    })

    test('contains welcome component at /', () => {
        const { unmount } = render(
            <MemoryRouter initialEntries={ ['/'] }>
                <App />
            </MemoryRouter>,
        )
        const welcomeHTML = screen.getByRole('main').outerHTML

        unmount()

        render(
            <MemoryRouter><Welcome /></MemoryRouter>,
        )
        const expectedHTML = screen.getByRole('main').outerHTML

        expect(welcomeHTML).toEqual(expectedHTML)
    })

    test('contains welcome component at /home', () => {
        const { unmount } = render(
            <MemoryRouter initialEntries={ ['/home'] }>
                <App />
            </MemoryRouter>,
        )
        const welcomeHTML = screen.getByRole('main').outerHTML

        unmount()

        render(
            <MemoryRouter><Welcome /></MemoryRouter>,
        )
        const expectedHTML = screen.getByRole('main').outerHTML

        expect(welcomeHTML).toEqual(expectedHTML)
    })

    test('contains workbook component at /workbook', () => {
        const { unmount } = render(
            <MemoryRouter initialEntries={ ['/workbook'] }>
                <App />
            </MemoryRouter>,
        )
        const workbookHTML = screen.getByRole('main').outerHTML

        unmount()

        render(
            <MemoryRouter><Workbook /></MemoryRouter>,
        )
        const expectedHTML = screen.getByRole('main').outerHTML

        expect(workbookHTML).toEqual(expectedHTML)
    })

    test('contains concentration worksheet at /workbook/concentration', () => {
        const { unmount } = render(
            <MemoryRouter initialEntries={ ['/workbook/concentration'] }>
                <App />
            </MemoryRouter>,
        )
        const worksheetHTML = screen.getByRole('main').outerHTML

        unmount()

        render(
            <MemoryRouter>
                <WorksheetContainer worksheet={ CONCENTRATION } />
            </MemoryRouter>,
        )
        const expectedHTML = screen.getByRole('main').outerHTML

        expect(worksheetHTML).toEqual(expectedHTML)
    })

    test('contains concentration info at /workbook/concentration', () => {
        mockLocation.hash = '#info'

        const { unmount } = render(
            <MemoryRouter initialEntries={ ['/workbook/concentration'] }>
                <App />
            </MemoryRouter>,
        )
        const worksheetHTML = screen.getByRole('main').outerHTML

        unmount()

        render(
            <MemoryRouter>
                <WorksheetContainer worksheet={ CONCENTRATION } />
            </MemoryRouter>,
        )
        const expectedHTML = screen.getByRole('main').outerHTML

        expect(worksheetHTML).toEqual(expectedHTML)
    })

    test('contains concentration gist at /workbook/concentration', () => {
        mockLocation.hash = '#gist'

        const { unmount } = render(
            <MemoryRouter initialEntries={ ['/workbook/concentration'] }>
                <App />
            </MemoryRouter>,
        )
        const worksheetHTML = screen.getByRole('main').outerHTML

        unmount()

        render(
            <MemoryRouter>
                <WorksheetContainer worksheet={ CONCENTRATION } />
            </MemoryRouter>,
        )
        const expectedHTML = screen.getByRole('main').outerHTML

        expect(worksheetHTML).toEqual(expectedHTML)
    })

    test('contains tower worksheet at /workbook/tower', () => {
        const { unmount } = render(
            <MemoryRouter initialEntries={ ['/workbook/tower'] }>
                <App />
            </MemoryRouter>,
        )
        const worksheetHTML = screen.getByRole('main').outerHTML

        unmount()

        render(
            <MemoryRouter>
                <WorksheetContainer worksheet={ TOWER } />
            </MemoryRouter>,
        )
        const expectedHTML = screen.getByRole('main').outerHTML

        expect(worksheetHTML).toEqual(expectedHTML)
    })

    test('contains tower info at /workbook/tower', () => {
        mockLocation.hash = '#info'

        const { unmount } = render(
            <MemoryRouter initialEntries={ ['/workbook/tower'] }>
                <App />
            </MemoryRouter>,
        )
        const worksheetHTML = screen.getByRole('main').outerHTML

        unmount()

        render(
            <MemoryRouter>
                <WorksheetContainer worksheet={ TOWER } />
            </MemoryRouter>,
        )
        const expectedHTML = screen.getByRole('main').outerHTML

        expect(worksheetHTML).toEqual(expectedHTML)
    })

    test('contains tower gist at /workbook/tower', () => {
        mockLocation.hash = '#gist'

        const { unmount } = render(
            <MemoryRouter initialEntries={ ['/workbook/tower'] }>
                <App />
            </MemoryRouter>,
        )
        const worksheetHTML = screen.getByRole('main').outerHTML

        unmount()

        render(
            <MemoryRouter>
                <WorksheetContainer worksheet={ TOWER } />
            </MemoryRouter>,
        )
        const expectedHTML = screen.getByRole('main').outerHTML

        expect(worksheetHTML).toEqual(expectedHTML)
    })

    test('contains route with pagenotfound component', () => {
        const { unmount } = render(
            <MemoryRouter initialEntries={ ['/pagenotfound'] }>
                <App />
            </MemoryRouter>,
        )
        const pagenotfoundHTML = screen.getByRole('main').outerHTML

        unmount()

        render(<PageNotFound />)
        const expectedHTML = screen.getByRole('main').outerHTML

        expect(pagenotfoundHTML).toEqual(expectedHTML)
    })

    test('contains footer', () => {
        const { unmount } = render(
            <MemoryRouter><App /></MemoryRouter>,
        )
        const footerHTML = screen.getByRole('contentinfo').outerHTML

        unmount()

        render(<Footer />)
        const expectedHTML = screen.getByRole('contentinfo').outerHTML

        expect(footerHTML).toEqual(expectedHTML)
    })
})

describe('App snapshot', () => {
    beforeAll(() => {
        mockLocation.hash = ''
    })

    test('matches snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter><App /></MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
