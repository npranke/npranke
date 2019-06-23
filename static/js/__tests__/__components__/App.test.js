import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import App from '../../components/App'
import Background from '../../components/Background'
import Concentration from '../../components/Concentration'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Welcome from '../../components/Welcome'
import PageNotFound from '../../components/PageNotFound'
import Workbook from '../../components/Workbook'

Enzyme.configure({ adapter: new Adapter() })

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
        ).toHaveLength(6)
    })

    test('contains route with header component', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route').at(0).props().component,
        ).toEqual(Header)
    })

    test('contains route with render function for header', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route').at(1).props().render,
        ).toBeInstanceOf(Function)
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

    test('contains route with concentration component', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route').at(4).props().component,
        ).toEqual(Concentration)
    })

    test('contains route with pagenotfound component', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route').at(5).props().component,
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
