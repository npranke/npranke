import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { mount, shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'

import App from '@components/App'
import Background from '@components/Background'
import Footer from '@components/Footer'
import Header from '@components/Header'
import PageNotFound from '@components/PageNotFound'
import Welcome from '@components/Welcome'
import Workbook from '@components/Workbook'
import WorksheetContainer from '@components/WorksheetContainer'

import worksheets from '@constants/worksheets'

jest.mock('@components/concentration/Concentration')
jest.mock('@components/tower/Tower')

Enzyme.configure({ adapter: new Adapter() })

const { CONCENTRATION, TOWER } = worksheets

describe('App', () => {
    test('contains background', () => {
        const app = shallow(<App />)

        expect(
            app.contains(<Background />),
        ).toBe(true)
    })

    test('contains switches', () => {
        const app = shallow(<App />)

        expect(
            app.find('Switch'),
        ).toHaveLength(2)
    })

    test('contains routes', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route'),
        ).toHaveLength(7)
    })

    test('contains route with header component', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route').at(0).props().component,
        ).toEqual(Header)
    })

    test('contains route with render for header', () => {
        const app = shallow(<App />)

        const header = mount(
            app.find('Route').at(1).props().render(),
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <Header isPageNotFound />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            header.html(),
        ).toEqual(expected.html())
    })

    test('contains route with welcome component', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route').at(2).props().component,
        ).toEqual(Welcome)
    })

    test('contains route with workbook component', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route').at(3).props().component,
        ).toEqual(Workbook)
    })

    test('contains route with render for concentration worksheet', () => {
        const app = shallow(<App />)

        const worksheetContainer = mount(
            app.find('Route').at(4).props().render(
                { location: { hash: '' } },
            ),
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <WorksheetContainer
                location={ { hash: '' } }
                worksheet={ CONCENTRATION }
            />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.html(),
        ).toEqual(expected.html())
    })

    test('contains route with render for concentration worksheet info', () => {
        const app = shallow(<App />)

        const worksheetContainer = mount(
            app.find('Route').at(4).props().render(
                { location: { hash: '#info' } },
            ),
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <WorksheetContainer
                location={ { hash: '#info' } }
                worksheet={ CONCENTRATION }
            />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.html(),
        ).toEqual(expected.html())
    })

    test('contains route with render for concentration worksheet gist', () => {
        const app = shallow(<App />)

        const worksheetContainer = mount(
            app.find('Route').at(4).props().render(
                { location: { hash: '#gist' } },
            ),
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <WorksheetContainer
                location={ { hash: '#gist' } }
                worksheet={ CONCENTRATION }
            />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.html(),
        ).toEqual(expected.html())
    })

    test('contains route with render for tower worksheet', () => {
        const app = shallow(<App />)

        const worksheetContainer = mount(
            app.find('Route').at(5).props().render(
                { location: { hash: '' } },
            ),
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <WorksheetContainer
                location={ { hash: '' } }
                worksheet={ TOWER }
            />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.html(),
        ).toEqual(expected.html())
    })

    test('contains route with render for tower worksheet info', () => {
        const app = shallow(<App />)

        const worksheetContainer = mount(
            app.find('Route').at(5).props().render(
                { location: { hash: '#info' } },
            ),
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <WorksheetContainer
                location={ { hash: '#info' } }
                worksheet={ TOWER }
            />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.html(),
        ).toEqual(expected.html())
    })

    test('contains route with render for tower worksheet gist', () => {
        const app = shallow(<App />)

        const worksheetContainer = mount(
            app.find('Route').at(5).props().render(
                { location: { hash: '#gist' } },
            ),
            { wrappingComponent: MemoryRouter },
        )

        const expected = mount(
            <WorksheetContainer
                location={ { hash: '#gist' } }
                worksheet={ TOWER }
            />,
            { wrappingComponent: MemoryRouter },
        )

        expect(
            worksheetContainer.html(),
        ).toEqual(expected.html())
    })

    test('contains route with pagenotfound component', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route').at(6).props().component,
        ).toEqual(PageNotFound)
    })

    test('contains footer', () => {
        const app = shallow(<App />)

        expect(
            app.contains(<Footer />),
        ).toBe(true)
    })
})

describe('App snapshot', () => {
    test('matches snapshot', () => {
        const app = shallow(<App />)

        expect(app).toMatchSnapshot()
    })
})
