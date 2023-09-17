import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import { render } from '@testing-library/react'

import Footer from '@components/Footer'

Enzyme.configure({ adapter: new Adapter() })

describe('Footer', () => {
    test('contains copyright symbol', () => {
        const footer = shallow(<Footer />)

        expect(
            footer.find('.copyright').text(),
        ).toMatch(/©/)
    })

    test('contains copyright year', () => {
        const footer = shallow(<Footer />)

        expect(
            footer.find('.copyright').text(),
        ).toMatch(/2023/)
    })
})

describe('Footer snapshot', () => {
    test('matches snapshot', () => {
        const { asFragment } = render(<Footer />)

        expect(asFragment()).toMatchSnapshot()
    })
})
