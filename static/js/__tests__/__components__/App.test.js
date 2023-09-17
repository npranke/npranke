import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import App from '@components/App'
import Background from '@components/Background'
import Footer from '@components/Footer'
import Header from '@components/Header'
import PageNotFound from '@components/PageNotFound'
import Welcome from '@components/Welcome'
import Workbook from '@components/Workbook'
import WorksheetContainer from '@components/WorksheetContainer'

import worksheets from '@constants/worksheets'

Enzyme.configure({ adapter: new Adapter() })

const mockLocation = { hash: '' }

jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual('react-router-dom'),
        useLocation: jest.fn(() => { return mockLocation }),
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
        const app = shallow(<App />)

        expect(
            app.contains(<Background />),
        ).toBe(true)
    })

    test('contains header', () => {
        const app = shallow(<App />)

        expect(
            app.contains(<Header />),
        ).toBe(true)
    })

    test('contains a routes component', () => {
        const app = shallow(<App />)

        expect(
            app.find('Routes'),
        ).toHaveLength(1)
    })

    test('contains route components', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route'),
        ).toHaveLength(6)
    })

    test('contains route with welcome component at /', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route').at(0).props().element,
        ).toEqual(<Welcome />)
    })

    test('contains route with welcome component at /home', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route').at(1).props().element,
        ).toEqual(<Welcome />)
    })

    test('contains route with workbook component', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route').at(2).props().element,
        ).toEqual(<Workbook />)
    })

    test('contains route for concentration worksheet', () => {
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

    test('contains route for concentration worksheet info', () => {
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

    test('contains route for concentration worksheet gist', () => {
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

    test('contains route for tower worksheet', () => {
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

    test('contains route for tower worksheet info', () => {
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

    test('contains route for tower worksheet gist', () => {
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
        const app = shallow(<App />)

        expect(
            app.find('Route').at(5).props().element,
        ).toEqual(<PageNotFound />)
    })

    test('contains footer', () => {
        const app = shallow(<App />)

        expect(
            app.contains(<Footer />),
        ).toBe(true)
    })
})

describe('App snapshot', () => {
    beforeAll(() => {
        mockLocation.hash = ''
    })

    test('matches snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
