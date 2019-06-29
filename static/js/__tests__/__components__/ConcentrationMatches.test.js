import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import ConcentrationMatches from '../../components/ConcentrationMatches'

Enzyme.configure({ adapter: new Adapter() })

const pictures = Array.from({ length: 12 }, (value, integer) => {
    return `${integer}`
}).reduce((pictureAccumulator, pictureid) => {
    pictureAccumulator[`picture${pictureid}`] = {
        image: <a href="image-link"><img src="" alt="" /></a>,
    }

    return pictureAccumulator
}, {})

describe('ConcentrationMatches', () => {
    test('has matches-header section', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(
            concentrationMatches.find('.matches-header').exists(),
        ).toBe(true)
    })

    test('has matches-pictures section', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(
            concentrationMatches.find('.matches-pictures').exists(),
        ).toBe(true)
    })

    test('shows matches number when less than 10', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches
                pictures={ pictures }
                matches={ ['0', '4', '10'] }
            />,
        )

        expect(
            concentrationMatches.find('.matches-portion.number').text(),
        ).toEqual('03')
    })

    test('shows matches number when 10', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches
                pictures={ pictures }
                matches={
                    Array.from(
                        { length: 10 },
                        (value, integer) => { return `${integer}` },
                    )
                }
            />,
        )

        expect(
            concentrationMatches.find('.matches-portion.number').text(),
        ).toEqual('10')
    })

    test('shows matches number when more than 10', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches
                pictures={ pictures }
                matches={
                    Array.from(
                        { length: 12 },
                        (value, integer) => { return `${integer}` },
                    )
                }
            />,
        )

        expect(
            concentrationMatches.find('.matches-portion.number').text(),
        ).toEqual('12')
    })

    test('shows turns number when less than 10', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches
                pictures={ pictures }
                turns={ 6 }
            />,
        )

        expect(
            concentrationMatches.find('.turns-portion.number').text(),
        ).toEqual('06')
    })

    test('shows turns number when 10', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches
                pictures={ pictures }
                turns={ 10 }
            />,
        )

        expect(
            concentrationMatches.find('.turns-portion.number').text(),
        ).toEqual('10')
    })

    test('shows turns number when more than 10', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches
                pictures={ pictures }
                turns={ 23 }
            />,
        )

        expect(
            concentrationMatches.find('.turns-portion.number').text(),
        ).toEqual('23')
    })

    test('has time-portion sections', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(
            concentrationMatches.find('.time-portion'),
        ).toHaveLength(6)
    })

    test('has time-portion number sections', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(
            concentrationMatches.find('.time-portion.number'),
        ).toHaveLength(3)
    })

    test('matches-pictures has no pictures with no matches', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(
            concentrationMatches.find('.matches-pictures').children(),
        ).toHaveLength(0)
    })

    test('matches-pictures has some pictures with some matches', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches
                pictures={ pictures }
                matches={ ['0', '4', '7', '10', '11'] }
            />,
        )

        expect(
            concentrationMatches.find('.matches-pictures').children(),
        ).toHaveLength(5)
    })

    test('matches-pictures has all pictures with all matches', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches
                pictures={ pictures }
                matches={
                    Array.from(
                        { length: 12 },
                        (value, integer) => { return `${integer}` },
                    )
                }
            />,
        )

        expect(
            concentrationMatches.find('.matches-pictures').children(),
        ).toHaveLength(12)
    })
})

describe('ConcentrationMatches snapshot', () => {
    test('matches snapshot without matches', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches pictures={ pictures } />,
        )

        expect(concentrationMatches).toMatchSnapshot()
    })

    test('matches snapshot with some matches', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches
                pictures={ pictures }
                matches={ ['0', '4', '7', '10'] }
            />,
        )

        expect(concentrationMatches).toMatchSnapshot()
    })

    test('matches snapshot with all matches', () => {
        const concentrationMatches = shallow(
            <ConcentrationMatches
                pictures={ pictures }
                matches={
                    Array.from(
                        { length: 12 },
                        (value, integer) => { return `${integer}` },
                    )
                }
            />,
        )

        expect(concentrationMatches).toMatchSnapshot()
    })
})
