import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { shallow } from 'enzyme'
import React from 'react'

import ConcentrationBoardRow from
    '@components/concentration/ConcentrationBoardRow'

Enzyme.configure({ adapter: new Adapter() })

const pictures = Array.from({ length: 6 }, (value, index) => {
    return `${index}`
}).map((pictureid) => {
    return {
        [`picture${pictureid}-a`]: {
            id: `${pictureid}-a`,
            pictureid,
            back: <img src="" alt="" className="picture-back" />,
            front: <img src="" alt="" className="picture-front" />,
            matched: <img src="" alt="" className="picture-matched" />,
        },
    }
})

describe('ConcentrationBoardRow', () => {
    test('board-row has pictures', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow pictures={ pictures } />,
        )

        expect(
            concentrationBoardRow.find('.board-row').children(),
        ).toHaveLength(6)
    })

    test('has all picture-back when no first, second, matches', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow pictures={ pictures } />,
        )

        expect(
            concentrationBoardRow.find('.picture-back'),
        ).toHaveLength(pictures.length)
    })

    test('has one picture-front when matching first', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow
                pictures={ pictures }
                first={ { id: '2-a', pictureid: '2' } }
            />,
        )

        expect(
            concentrationBoardRow.find('.picture-front'),
        ).toHaveLength(1)
    })

    test('has no picture-front when non-matching first', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow
                pictures={ pictures }
                first={ { id: '9-a', pictureid: '9' } }
            />,
        )

        expect(
            concentrationBoardRow.find('.picture-front'),
        ).toHaveLength(0)
    })

    test('has one picture-front when matching second', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow
                pictures={ pictures }
                second={ { id: '3-a', pictureid: '3' } }
            />,
        )

        expect(
            concentrationBoardRow.find('.picture-front'),
        ).toHaveLength(1)
    })

    test('has no picture-front when non-matching second', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow
                pictures={ pictures }
                second={ { id: '8-b', pictureid: '8' } }
            />,
        )

        expect(
            concentrationBoardRow.find('.picture-front'),
        ).toHaveLength(0)
    })

    test('has two picture-front when matching first and second', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow
                pictures={ pictures }
                first={ { id: '0-a', pictureid: '0' } }
                second={ { id: '3-a', pictureid: '3' } }
            />,
        )

        expect(
            concentrationBoardRow.find('.picture-front'),
        ).toHaveLength(2)
    })

    test('has no picture-front when non-matching first and second', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow
                pictures={ pictures }
                first={ { id: '10-b', pictureid: '10' } }
                second={ { id: '7-a', pictureid: '7' } }
            />,
        )

        expect(
            concentrationBoardRow.find('.picture-front'),
        ).toHaveLength(0)
    })

    test('has no picture-matched with no matches', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow pictures={ pictures } />,
        )

        expect(
            concentrationBoardRow.find('.picture-matched'),
        ).toHaveLength(0)
    })

    test('has some picture-matched with some matches', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow
                pictures={ pictures }
                matches={ ['0', '1', '5'] }
            />,
        )

        expect(
            concentrationBoardRow.find('.picture-matched'),
        ).toHaveLength(3)
    })

    test('has all picture-matched with all matches', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow
                pictures={ pictures }
                matches={
                    Array.from(
                        { length: 6 },
                        (value, index) => { return `${index}` },
                    )
                }
            />,
        )

        expect(
            concentrationBoardRow.find('.picture-matched'),
        ).toHaveLength(6)
    })

    test('can have picture-back, picture-front, picture-matched mix', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow
                pictures={ pictures }
                matches={ ['0', '5'] }
                first={ { id: '4-a', pictureid: '4' } }
                second={ { id: '2-a', pictureid: '2' } }
            />,
        )

        expect(
            concentrationBoardRow.find('.picture-back'),
        ).toHaveLength(2)
        expect(
            concentrationBoardRow.find('.picture-front'),
        ).toHaveLength(2)
        expect(
            concentrationBoardRow.find('.picture-matched'),
        ).toHaveLength(2)
    })
})

describe('ConcentrationBoardRow snapshot', () => {
    test('matches snapshot', () => {
        const concentrationBoardRow = shallow(
            <ConcentrationBoardRow pictures={ pictures } />,
        )

        expect(concentrationBoardRow).toMatchSnapshot()
    })
})
