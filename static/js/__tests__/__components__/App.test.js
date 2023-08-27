import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import Enzyme, { mount, shallow } from 'enzyme'
import { render } from '@testing-library/react'

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

    test('contains route with render for concentration worksheet', () => {
        const app = shallow(<App />)

        const worksheetContainer = mount(
            app.find('Route').at(3).props().element,
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <WorksheetContainer worksheet={ CONCENTRATION } />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.html(),
        ).toEqual(expected.html())
    })

    test('contains route with render for concentration worksheet info', () => {
        mockLocation.hash = '#info'

        const app = shallow(<App />)

        const worksheetContainer = mount(
            app.find('Route').at(3).props().element,
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <WorksheetContainer worksheet={ CONCENTRATION } />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.html(),
        ).toEqual(expected.html())
    })

    test('contains route with render for concentration worksheet gist', () => {
        mockLocation.hash = '#gist'

        const app = shallow(<App />)

        const worksheetContainer = mount(
            app.find('Route').at(3).props().element,
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <WorksheetContainer worksheet={ CONCENTRATION } />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.html(),
        ).toEqual(expected.html())
    })

    test('contains route with render for tower worksheet', () => {
        const app = shallow(<App />)

        const worksheetContainer = mount(
            app.find('Route').at(4).props().element,
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <WorksheetContainer worksheet={ TOWER } />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.html(),
        ).toEqual(expected.html())
    })

    test('contains route with render for tower worksheet info', () => {
        mockLocation.hash = '#info'

        const app = shallow(<App />)

        const worksheetContainer = mount(
            app.find('Route').at(4).props().element,
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <WorksheetContainer worksheet={ TOWER } />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.html(),
        ).toEqual(expected.html())
    })

    test('contains route with render for tower worksheet gist', () => {
        mockLocation.hash = '#gist'

        const app = shallow(<App />)

        const worksheetContainer = mount(
            app.find('Route').at(4).props().element,
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <WorksheetContainer worksheet={ TOWER } />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.html(),
        ).toEqual(expected.html())
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
