import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter } from 'react-router-dom'
import Enzyme, { shallow } from 'enzyme'
import { render } from '@testing-library/react'

import Header from '@components/Header'

Enzyme.configure({ adapter: new Adapter() })

describe('Header', () => {
    test('has navlink to home', () => {
        const header = shallow(<Header />)

        expect(
            header.find('.icon-container-home NavLink').props().to,
        ).toEqual('/home')
    })

    test('has navlink to workbook', () => {
        const header = shallow(<Header />)

        expect(
            header.find('.icon-container-workbook NavLink').props().to,
        ).toEqual('/workbook')
    })

    test('has link to github profile', () => {
        const header = shallow(<Header />)

        expect(
            header.find('.icon-container-github a').props().href,
        ).toEqual('https://github.com/npranke')
    })

    test('has link to linkedin profile', () => {
        const header = shallow(<Header />)

        expect(
            header.find('.icon-container-linkedin a').props().href,
        ).toEqual('https://www.linkedin.com/in/npranke')
    })

    test('has alt text for home icon', () => {
        const header = shallow(<Header />)

        expect(
            header.find('.icon-home').props().alt,
        ).toEqual('Home icon')
    })

    test('has alt text for workbook icon', () => {
        const header = shallow(<Header />)

        expect(
            header.find('.icon-workbook').props().alt,
        ).toEqual('Workbook icon')
    })

    test('has alt text for github icon', () => {
        const header = shallow(<Header />)

        expect(
            header.find('.icon-github').props().alt,
        ).toEqual('GitHub icon')
    })

    test('has alt text for linkedin icon', () => {
        const header = shallow(<Header />)

        expect(
            header.find('.icon-linkedin').props().alt,
        ).toEqual('LinkedIn icon')
    })
})

describe('Header snapshot', () => {
    test('matches snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        )

        expect(asFragment()).toMatchSnapshot()
    })
})
