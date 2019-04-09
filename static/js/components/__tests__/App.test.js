import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import App from '../App'
import Background from '../Background'
import Footer from '../Footer'
import Menu from '../Menu'

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
    test('contains background', () => {
        const app = shallow(<App />)

        expect(
            app.contains(<Background />),
        ).toBe(true)
    })

    test('contains menu', () => {
        const app = shallow(<App />)

        expect(
            app.contains(<Menu />),
        ).toBe(true)
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
