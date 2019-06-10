import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import App from '../../components/App'
import Background from '../../components/Background'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
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

    test('contains switch', () => {
        const app = shallow(<App />)

        expect(
            app.exists('Switch'),
        ).toBe(true)
    })

    test('contains routes', () => {
        const app = shallow(<App />)

        expect(
            app.find('Route'),
        ).toHaveLength(2)
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
